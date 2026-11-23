/* _worker.js: tiny shared scoreboard for the Quiz page (Cloudflare Pages).
   Needs ONE KV namespace bound to this project with the variable name:  QUIZ_KV
   Everything else on the site is passed straight through to your normal files. */
const KEY = "board";
const MAX_SIGS = 200;            /* keep the newest 200 signatures */
const PASS = 7;                  /* same rule as the quiz: 7 or more = success */

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const clean = (s) =>
  String(s == null ? "" : s).replace(/[\u0000-\u001f\u007f<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 30);

async function load(kv) {
  const d = (await kv.get(KEY, "json")) || {};
  return { played: d.played | 0, passed: d.passed | 0, failed: d.failed | 0, sigs: Array.isArray(d.sigs) ? d.sigs : [] };
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
  } else if (body.type === "sign") {
    const name = clean(body.name);
    if (!name) return json({ error: "name" }, 400);
    d.sigs.unshift({ n: name, s: score, t: new Date().toISOString().slice(0, 10) });
    d.sigs = d.sigs.slice(0, MAX_SIGS);
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
