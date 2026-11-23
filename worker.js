/* _worker.js: tiny shared scoreboard for the Quiz page (Cloudflare Pages).
   Needs ONE KV namespace bound to this project with the variable name:  QUIZ_KV
   Everything else on the site is passed straight through to your normal files. */
const KEY = "board";
const MAX_SIGS = 200;            /* keep the newest 200 signatures */
const PASS = 7;                  /* same rule as the quiz: 7 or more = success */

const json = (obj, status = 200, extra = {}) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });

/* today's date in Pakistan time (UTC+5) */
const pkDate = () => new Date(Date.now() + 5 * 3600 * 1000).toISOString().slice(0, 10);

/* one signature per browser (cookie) + at most 3 per internet connection (hashed, raw IP is never stored) */
const IP_LIMIT = 3;
async function hashIp(ip) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("quiz:" + ip));
  return [...new Uint8Array(buf)].slice(0, 12).map((b) => b.toString(16).padStart(2, "0")).join("");
}

const clean = (s) =>
  String(s == null ? "" : s).replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 30);

async function load(kv) {
  const d = (await kv.get(KEY, "json")) || {};
  const r = d.repeat || {};
  return { played: d.played | 0, passed: d.passed | 0, failed: d.failed | 0, repeat: { people: r.people | 0, passed: r.passed | 0 }, sigs: Array.isArray(d.sigs) ? d.sigs : [] };
}

async function handleQuiz(request, env) {
  const kv = env.QUIZ_KV;
  if (!kv) return json({ error: "QUIZ_KV is not bound" }, 503);

  if (request.method === "GET") return json(await load(kv));
  if (request.method !== "POST") return json({ error: "method" }, 405);

  /* only accept posts coming from this same site */
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) return json({ error: "origin" }, 403);

  let body;
  try { body = await request.json(); } catch (e) { return json({ error: "bad json" }, 400); }
  const score = Number(body && body.score);
  if (!Number.isInteger(score) || score < 0 || score > 10) return json({ error: "bad score" }, 400);

  const d = await load(kv);
  if (body.type === "result") {
    d.played++;
    if (score >= PASS) d.passed++; else d.failed++;
    /* who is playing again? each browser gets a random anonymous id (cookie "qid") */
    const m = (request.headers.get("cookie") || "").match(/(?:^|;\s*)qid=([\w-]{10,60})/);
    const qid = m ? m[1] : crypto.randomUUID();
    const players = (await kv.get("players", "json")) || {};
    const p = players[qid] || { c: 0, k: 0 };
    p.c++; if (score >= PASS) p.k = 1;
    players[qid] = p;
    let people = 0, ok = 0;
    for (const k in players) if (players[k].c >= 2) { people++; if (players[k].k) ok++; }
    d.repeat = { people, passed: ok };
    await kv.put("players", JSON.stringify(players));
    await kv.put(KEY, JSON.stringify(d));
    return json(d, 200, m ? {} : { "set-cookie": "qid=" + qid + "; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly" });
  } else if (body.type === "sign") {
    const name = clean(body.name);
    if (!name) return json({ error: "name" }, 400);
    if (/(?:^|;\s*)qsig=1/.test(request.headers.get("cookie") || "")) return json({ error: "dup" }, 409);
    const ip = await hashIp(request.headers.get("cf-connecting-ip") || "unknown");
    const ips = (await kv.get("ips", "json")) || {};
    if ((ips[ip] | 0) >= IP_LIMIT) return json({ error: "dup" }, 409);
    ips[ip] = (ips[ip] | 0) + 1;
    await kv.put("ips", JSON.stringify(ips));
    d.sigs.unshift({ n: name, s: score, t: pkDate() });
    d.sigs = d.sigs.slice(0, MAX_SIGS);
    await kv.put(KEY, JSON.stringify(d));
    return json(d, 200, { "set-cookie": "qsig=1; Path=/; Max-Age=31536000; SameSite=Lax; Secure; HttpOnly" });
  } else {
    return json({ error: "type" }, 400);
  }
  await kv.put(KEY, JSON.stringify(d));
  return json(d);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/quiz") return handleQuiz(request, env);
    return env.ASSETS.fetch(request);
  },
};
