/* extras.js: entrance popup (fun/formal), back-to-top, Featured Work, Reports tabs, Quiz, Story Map */
(function () {
  var D = window.SITE || {}, D2 = window.SITE2 || {};
  var page = document.body.getAttribute("data-page") || "";
  var root = document.documentElement;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var store = null; try { store = window.localStorage; } catch (e) {}
  function get(k) { try { return store && store.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { store && store.setItem(k, v); } catch (e) {} }
  var WA = "https://wa.me/923330447979";

  /* ---------- look: fun or formal ---------- */
  var mode = get("siteMode") === "formal" ? "formal" : "fun";
  function applyMode(m) {
    mode = m; if (m === "formal") root.setAttribute("data-theme", "formal"); else root.removeAttribute("data-theme");
    set("siteMode", m);
  }
  if (mode === "formal") root.setAttribute("data-theme", "formal");

  var css = document.createElement("style");
  css.textContent = [
    /* entrance */
    ".ent{position:fixed;inset:0;z-index:300;display:grid;grid-template-columns:1fr 1fr;font-family:'Space Grotesk',system-ui,sans-serif}",
    ".ent button.side{border:0;margin:0;padding:24px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;font:inherit;cursor:pointer;text-align:center;transition:filter .2s,flex .2s}",
    ".ent .fun{background:#ffd23f;color:#161616;background-image:radial-gradient(rgba(0,0,0,.12) 2px,transparent 2px);background-size:20px 20px}",
    ".ent .for{background:#14213d;color:#f5f5f0}",
    ".ent .side .big{font-size:4rem;line-height:1}",
    ".ent .side b{font-family:'Archivo Black',Impact,sans-serif;font-size:1.7rem;font-weight:400}",
    ".ent .side small{font-size:.95rem;opacity:.85;max-width:15em}",
    ".ent .side .go{display:inline-block;padding:10px 22px;font-weight:700;border-radius:10px;font-size:1.05rem}",
    ".ent .fun .go{background:#d7263d;color:#fff;border:3px solid #161616;box-shadow:4px 4px 0 #161616}",
    ".ent .for .go{background:#f5f5f0;color:#14213d;border:2px solid #f5f5f0;border-radius:4px}",
    ".ent .side:hover,.ent .side:focus-visible{filter:brightness(1.08)}",
    ".ent .side:focus-visible{outline:4px solid #d7263d;outline-offset:-8px}",
    ".ent h2{position:absolute;top:18px;left:50%;transform:translateX(-50%);margin:0;z-index:2;background:#fff8e7;color:#161616;border:3px solid #161616;box-shadow:4px 4px 0 #161616;padding:8px 18px;font-size:clamp(1.05rem,3.2vw,1.8rem);text-align:center;width:max-content;max-width:92vw;font-family:'Archivo Black',Impact,sans-serif;font-weight:400}",
    ".ent .vs{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:52px;height:52px;border-radius:50%;background:#d7263d;color:#fff;border:3px solid #161616;display:flex;align-items:center;justify-content:center;font-weight:800;z-index:2}",
    "@media(max-width:640px){.ent{grid-template-columns:1fr;grid-template-rows:1fr 1fr}.ent .side .big{font-size:2.6rem}.ent .side b{font-size:1.3rem}.ent button.side{padding:56px 16px 16px}.ent button.for{padding:16px}.ent h2{top:10px}}",
    /* back to top */
    ".totop{position:fixed;right:16px;bottom:16px;z-index:60;width:46px;height:46px;border-radius:50%;background:var(--red);color:#fff;border:3px solid var(--ink);box-shadow:3px 3px 0 var(--ink);font-size:1.3rem;line-height:1;font-weight:700;opacity:0;pointer-events:none;transform:translateY(12px);transition:opacity .25s,transform .25s;cursor:pointer;padding:0}",
    ".totop.on{opacity:1;pointer-events:auto;transform:none}",
    /* featured */
    ".feat{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}",
    ".feat .fc{display:block;text-decoration:none;color:inherit;padding:0;overflow:hidden}",
    ".feat .fc img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-bottom:3px solid var(--ink)}",
    ".feat .fc span{display:block;padding:8px 12px;font-weight:700;font-size:.95rem}",
    ".feat .fc span i{font-style:normal;color:var(--red);margin-left:4px}",
    "@media(max-width:560px){.feat{grid-template-columns:1fr;gap:12px}.feat .fc{display:flex;align-items:center}.feat .fc img{width:42%;border-bottom:0;border-right:3px solid var(--ink);flex:none}.feat .fc span{padding:8px 12px}}",
    /* tabs */
    ".tabs{display:flex;flex-wrap:wrap;gap:10px;margin:6px 0 20px}",
    ".tabs button{font:inherit;font-weight:700;background:var(--cream);color:var(--ink);border:3px solid var(--ink);border-radius:999px;padding:5px 16px;box-shadow:3px 3px 0 var(--ink);cursor:pointer}",
    ".tabs button[aria-selected=true]{background:var(--red);color:#fff}",
    ".tabs button small{opacity:.75;font-weight:600;margin-left:4px}",
    ".tabs-empty{padding:20px;font-weight:600}",
    /* quiz */
    ".quiz{max-width:640px;margin:0 auto}",
    ".q-top{display:flex;justify-content:space-between;font-weight:700;margin-bottom:10px}",
    ".q-bar{height:12px;border:3px solid var(--ink);border-radius:999px;background:var(--cream);overflow:hidden;margin-bottom:16px}",
    ".q-bar i{display:block;height:100%;background:var(--red);width:0;transition:width .3s}",
    ".q-opts{display:grid;gap:10px;margin:14px 0}",
    ".q-opt{font:inherit;font-weight:600;text-align:left;background:var(--paper);color:var(--ink);border:3px solid var(--ink);border-radius:10px;padding:10px 14px;box-shadow:3px 3px 0 var(--ink);cursor:pointer}",
    ".q-opt:disabled{cursor:default}",
    ".q-opt.right{background:#b7f0b1}.q-opt.wrong{background:#ffc9d0}",
    ".q-fb{min-height:2.6em;font-weight:600;margin:0 0 10px}",
    ".q-score{font-family:'Archivo Black',Impact,sans-serif;font-size:3rem;margin:6px 0}",
    ".modal{position:fixed;inset:0;z-index:250;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;padding:20px}",
    ".modal .box{background:var(--cream);color:var(--ink);border:4px solid var(--ink);border-radius:16px;box-shadow:8px 8px 0 var(--red);max-width:440px;width:100%;padding:26px 22px;text-align:center;animation:pop .45s ease-out}",
    ".modal .box h2{margin:0 0 .4em}",
    ".modal .emo{font-size:3rem;line-height:1}",
    ".modal .btn-row{justify-content:center}",
    ".wa{background:#25d366;color:#082b14}",
    /* map */
    ".mapbox{background:var(--cream);border:3px solid var(--ink);border-radius:12px;box-shadow:var(--shadow);padding:10px}",
    ".mapbox svg{display:block;width:100%;height:auto}",
    ".mapbox .land{fill:#ffe9a8;stroke:var(--ink);stroke-width:3;stroke-linejoin:round}",
    ".pin{cursor:pointer}",
    ".pin circle{fill:var(--red);stroke:var(--ink);stroke-width:3;transition:r .15s}",
    ".pin.soon circle{fill:#9a9a9a}",
    ".pin:hover circle,.pin:focus circle{r:11}",
    ".pin:focus{outline:none}.pin:focus circle{stroke:#000;stroke-width:4}",
    ".pin text{font:700 15px 'Space Grotesk',system-ui,sans-serif;fill:var(--ink);paint-order:stroke;stroke:var(--cream);stroke-width:4px}",
    ".map-msg{min-height:3em;font-weight:600;margin:12px 0}",
    ".map-list{display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));margin-top:10px}",
    /* footer switch */
    ".lookswitch{background:none;border:0;color:var(--yellow);font:inherit;font-weight:600;text-decoration:underline;cursor:pointer;padding:0}",

    /* ===== FORMAL LOOK ===== */
    "html[data-theme=formal]{--paper:#f6f6f3;--cream:#ffffff;--ink:#14213d;--red:#8c1c2b;--yellow:#e7e3d6;--shadow:0 1px 6px rgba(20,33,61,.14)}",
    "html[data-theme=formal] body{background-image:none}",
    "html[data-theme=formal] h1,html[data-theme=formal] h2,html[data-theme=formal] h3,html[data-theme=formal] .logo,html[data-theme=formal] .q-score{font-family:Georgia,'Times New Roman',serif;font-weight:700;letter-spacing:0}",
    "html[data-theme=formal] *,html[data-theme=formal] *::before,html[data-theme=formal] *::after{animation:none!important}",
    "html[data-theme=formal] .card,html[data-theme=formal] .card:nth-child(odd),html[data-theme=formal] .card:nth-child(even),html[data-theme=formal] .photo-frame,html[data-theme=formal] .kicker,html[data-theme=formal] .snap{transform:none!important}",
    "html[data-theme=formal] .card,html[data-theme=formal] .mapbox,html[data-theme=formal] .modal .box{border:1px solid #d5d5cf;border-radius:6px}",
    "html[data-theme=formal] .photo-frame{border:1px solid #d5d5cf;box-shadow:0 4px 18px rgba(20,33,61,.18);border-radius:6px;overflow:hidden}",
    "html[data-theme=formal] .btn,html[data-theme=formal] .tabs button,html[data-theme=formal] .q-opt,html[data-theme=formal] .pill{border:1px solid var(--ink);box-shadow:none;border-radius:4px}",
    "html[data-theme=formal] .tabs button{border-radius:999px}",
    "html[data-theme=formal] .btn:hover{transform:none;box-shadow:0 2px 8px rgba(0,0,0,.25)}",
    "html[data-theme=formal] .btn.alt{background:#e7e3d6}",
    "html[data-theme=formal] .site-header{border-bottom:3px solid var(--red)}",
    "html[data-theme=formal] .kicker{background:#e7e3d6;border:1px solid #cfcab8;box-shadow:none}",
    "html[data-theme=formal] .section-title .tag,html[data-theme=formal] .hero .tag{display:none}",
    "html[data-theme=formal] .totop{box-shadow:none;border:1px solid var(--ink)}",
    "html[data-theme=formal] .vcard .thumb,html[data-theme=formal] .feat .fc img{border-bottom:1px solid #d5d5cf}",
    "html[data-theme=formal] .mapbox .land{fill:#ece8da;stroke-width:2}",
    "html[data-theme=formal] .q-bar{border:1px solid var(--ink)}"
  ].join("\n");
  document.head.appendChild(css);

  /* ---------- entrance popup ---------- */
  var isBot = /bot|crawl|spider|slurp|lighthouse|pagespeed/i.test(navigator.userAgent || "");
  if (!get("siteMode") && !isBot && page !== "404") showEntrance();
  function showEntrance() {
    var d = document.createElement("div");
    d.className = "ent"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", "How would you like to meet me?");
    d.innerHTML =
      '<h2>How would you like to meet me?</h2>' +
      '<button type="button" class="side fun" data-m="fun"><span class="big">🥊</span><b>Keep it fun</b><small>Bold colours, jokes and a little chaos.</small><span class="go">Let’s go</span></button>' +
      '<button type="button" class="side for" data-m="formal"><span class="big">💼</span><b>Keep it formal</b><small>Clean, calm and strictly professional.</small><span class="go">Continue</span></button>' +
      '<span class="vs" aria-hidden="true">OR</span>';
    document.body.appendChild(d);
    document.body.style.overflow = "hidden";
    d.addEventListener("click", function (e) {
      var b = e.target.closest("[data-m]"); if (!b) return;
      applyMode(b.getAttribute("data-m"));
      d.remove(); document.body.style.overflow = "";
      location.reload();
    });
    var first = d.querySelector(".side"); if (first) first.focus();
  }

  /* footer: switch look */
  var fl = document.querySelector("#site-footer .links");
  if (fl) {
    var sw = document.createElement("button");
    sw.type = "button"; sw.className = "lookswitch";
    sw.textContent = mode === "formal" ? "Switch to the fun look" : "Switch to the formal look";
    sw.addEventListener("click", function () { applyMode(mode === "formal" ? "fun" : "formal"); location.reload(); });
    fl.appendChild(sw);
  }
  if (mode === "formal") {
    var sm = document.querySelector("#site-footer small");
    if (sm) sm.innerHTML = "&copy; " + new Date().getFullYear() + " Asher Taqdees. All rights reserved.";
    document.querySelectorAll(".vcard .btn").forEach(function (b) { b.textContent = "Watch on YouTube"; });
  }

  /* ---------- back to top ---------- */
  var tt = document.createElement("button");
  tt.type = "button"; tt.className = "totop"; tt.setAttribute("aria-label", "Back to top"); tt.innerHTML = "↑";
  document.body.appendChild(tt);
  tt.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
  function tick() { tt.classList.toggle("on", (window.scrollY || document.documentElement.scrollTop) > 500); }
  window.addEventListener("scroll", tick, { passive: true }); tick();

  /* ---------- Home: Featured Work ---------- */
  if (page === "home" && D2.featured && D2.featured.length) {
    var anchor = document.querySelector(".facts"); anchor = anchor && anchor.closest("section");
    if (anchor) {
      var sec = document.createElement("section");
      sec.innerHTML = '<div class="wrap"><div class="section-title"><h2><span class="jab">Featured Work</span></h2><span class="tag">the greatest hits</span></div><div class="feat">' +
        D2.featured.map(function (f) {
          var u = "https://www.youtube.com/watch?v=" + f.id;
          return '<a class="card fc" href="' + u + '" target="_blank" rel="noopener"><img loading="lazy" decoding="async" src="https://i.ytimg.com/vi/' + f.id + '/hqdefault.jpg" alt="' + esc(f.label) + ' video thumbnail"><span>' + esc(f.label) + ' <i>▶</i></span></a>';
        }).join("") + '</div></div>';
      anchor.parentNode.insertBefore(sec, anchor.nextSibling);
    }
  }

  /* ---------- Reports: filter tabs ---------- */
  if (page === "videos") {
    var grid = document.getElementById("video-grid"), tabsEl = document.getElementById("rep-tabs");
    var vids = D.videos || [], titles = {}, cur = "all", W = D2.words || {}, O = D2.cats || {};
    var TABS = [["all", "All"], ["investigations", "Investigations"], ["general", "General Reports"], ["explainers", "Explainers"], ["promotions", "Promotions"]];
    var cache = {}; try { cache = JSON.parse(get("ytTitles") || "{}"); } catch (e) {}
    function has(t, list) { t = (t || "").toLowerCase(); return (list || []).some(function (w) { return t.indexOf(w) > -1; }); }
    function catOf(v) {
      if (O[v.id]) return O[v.id];
      if (v.cat) return v.cat;
      var t = v.title || titles[v.id] || "";
      if (has(t, W.investigations)) return "investigations";
      if (has(t, W.explainers)) return "explainers";
      if (has(t, W.promotions)) return "promotions";
      return "general";
    }
    function card(v) {
      var url = "https://www.youtube.com/watch?v=" + v.id, t = v.title || titles[v.id] || "Watch on YouTube";
      return '<article class="card vcard"><a class="thumb" href="' + url + '" target="_blank" rel="noopener" aria-label="Watch on YouTube"><img loading="lazy" decoding="async" src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt=""></a>' +
        '<div class="body"><p class="vt">' + esc(t) + '</p><a class="btn" href="' + url + '" target="_blank" rel="noopener">' + (mode === "formal" ? "Watch on YouTube" : "Watch (popcorn optional)") + "</a></div></article>";
    }
    function draw() {
      var counts = { all: vids.length };
      vids.forEach(function (v) { var c = catOf(v); counts[c] = (counts[c] || 0) + 1; });
      tabsEl.innerHTML = TABS.map(function (t) {
        return '<button type="button" role="tab" data-c="' + t[0] + '" aria-selected="' + (t[0] === cur) + '">' + t[1] + "<small>" + (counts[t[0]] || 0) + "</small></button>";
      }).join("");
      var list = vids.filter(function (v) { return cur === "all" || catOf(v) === cur; });
      grid.innerHTML = list.length ? list.map(card).join("") : '<p class="tabs-empty">Nothing in this tab yet.</p>';
    }
    if (grid && tabsEl) {
      vids.forEach(function (v) { if (cache[v.id]) titles[v.id] = cache[v.id]; });
      draw();
      tabsEl.addEventListener("click", function (e) {
        var b = e.target.closest("[data-c]"); if (!b) return;
        cur = b.getAttribute("data-c"); draw();
      });
      var todo = vids.filter(function (v) { return !v.title && !titles[v.id]; });
      var pending = todo.length, changed = false;
      todo.forEach(function (v) {
        var ctl = window.AbortController ? new AbortController() : null;
        var tm = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
        fetch("https://noembed.com/embed?url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + v.id), ctl ? { signal: ctl.signal } : {})
          .then(function (r) { return r.json(); })
          .then(function (j) { if (j && j.title) { titles[v.id] = j.title; cache[v.id] = j.title; changed = true; } })
          .catch(function () {})
          .then(function () {
            if (tm) clearTimeout(tm);
            if (--pending === 0 && changed) { set("ytTitles", JSON.stringify(cache)); draw(); }
          });
      });
    }
  }

  /* ---------- Quiz ---------- */
  if (page === "quiz") {
    var Q = [
      ["In journalism, what is the “lede” (or lead) of a story?", ["The opening paragraph that gives the key facts", "The photo caption", "The reporter’s name line", "The last sentence"], 0, "The lede opens the story with its most important facts."],
      ["Which of these is NOT one of the classic five Ws of news?", ["Who", "Where", "Whether", "Why"], 2, "The five Ws are Who, What, When, Where and Why."],
      ["Which mountain is the second highest in the world?", ["Makalu", "K2", "Lhotse", "Nanga Parbat"], 1, "K2, in the Karakoram range, stands at about 8,611 m."],
      ["Which is the longest river flowing through Pakistan?", ["Ravi", "Jhelum", "Indus", "Chenab"], 2, "The Indus runs the length of the country to the Arabian Sea."],
      ["Which planet is known as the Red Planet?", ["Venus", "Jupiter", "Mars", "Mercury"], 2, "Iron oxide (rust) on its surface gives Mars its colour."],
      ["Complete the sentence: “___ going to win this match.”", ["Their", "There", "They’re", "Thier"], 2, "They’re = they are."],
      ["How many rounds is a standard men’s world title boxing fight?", ["8", "10", "12", "15"], 2, "Modern world title fights are scheduled for 12 rounds."],
      ["Which word is spelled correctly?", ["Accomodation", "Acommodation", "Accommodation", "Acomodation"], 2, "Two c’s and two m’s: accommodation."],
      ["What is Pakistan’s national sport?", ["Cricket", "Field hockey", "Squash", "Kabaddi"], 1, "Field hockey is the official national sport, though cricket is the most popular."],
      ["Which is the largest ocean on Earth?", ["Atlantic", "Indian", "Arctic", "Pacific"], 3, "The Pacific covers about a third of the planet."]
    ];
    var box = document.getElementById("quiz-root"), i = 0, score = 0;
    var start = function () {
      i = 0; score = 0; ask();
    };
    var ask = function () {
      var q = Q[i];
      box.innerHTML = '<div class="card quiz"><div class="q-top"><span>Question ' + (i + 1) + ' of ' + Q.length + '</span><span>Score: ' + score + '</span></div>' +
        '<div class="q-bar"><i style="width:' + (i / Q.length * 100) + '%"></i></div><h2 style="font-size:1.35rem">' + q[0] + '</h2><div class="q-opts">' +
        q[1].map(function (o, k) { return '<button type="button" class="q-opt" data-k="' + k + '">' + esc(o) + "</button>"; }).join("") +
        '</div><p class="q-fb" role="status" aria-live="polite"></p><button type="button" class="btn" id="q-next" hidden>' + (i === Q.length - 1 ? "See my score" : "Next") + "</button></div>";
      var opts = box.querySelectorAll(".q-opt");
      opts.forEach(function (b) {
        b.addEventListener("click", function () {
          var k = +b.getAttribute("data-k"), ok = k === q[2];
          if (ok) score++;
          opts.forEach(function (o) { o.disabled = true; });
          opts[q[2]].classList.add("right"); if (!ok) b.classList.add("wrong");
          box.querySelector(".q-fb").textContent = (ok ? "Correct! " : "Not quite. ") + q[3];
          box.querySelector(".q-top span:last-child").textContent = "Score: " + score;
          var n = document.getElementById("q-next"); n.hidden = false; n.focus();
        });
      });
      document.getElementById("q-next").addEventListener("click", function () { i++; if (i < Q.length) ask(); else finish(); });
    };
    var finish = function () {
      var win = score >= 7;
      box.innerHTML = '<div class="card quiz" style="text-align:center"><div class="q-bar"><i style="width:100%"></i></div><p style="margin:0;font-weight:700">Your score</p><div class="q-score">' + score + ' / ' + Q.length + '</div><p>' +
        (win ? "You nailed it! Check your prize." : "So close. You need 7 to win the coffee. Try again!") + '</p><div class="btn-row" style="justify-content:center"><button type="button" class="btn" id="q-again">Play again</button>' +
        (win ? '<button type="button" class="btn alt" id="q-prize">Show my prize</button>' : "") + "</div></div>";
      document.getElementById("q-again").addEventListener("click", start);
      if (win) { var p = document.getElementById("q-prize"); p.addEventListener("click", prize); prize(); }
    };
    var prize = function () {
      var m = document.createElement("div");
      m.className = "modal"; m.setAttribute("role", "dialog"); m.setAttribute("aria-modal", "true");
      m.innerHTML = '<div class="box"><div class="emo">🎉☕</div><h2>Congratulations 🎉</h2><p><b>Asher Taqdees offers you a coffee!</b></p><p>To avail, share this screenshot with him on WhatsApp.</p>' +
        '<div class="btn-row"><a class="btn wa" target="_blank" rel="noopener" href="' + WA + "?text=" + encodeURIComponent("Hi Asher! I scored " + score + "/10 on your quiz. I'm here for my coffee ☕") + '">Open WhatsApp</a><button type="button" class="btn alt" id="m-close">Close</button></div></div>';
      document.body.appendChild(m);
      m.querySelector("#m-close").focus();
      var close = function () { m.remove(); };
      m.querySelector("#m-close").addEventListener("click", close);
      m.addEventListener("click", function (e) { if (e.target === m) close(); });
    };
    if (box) start();
  }

  /* ---------- Story Map ---------- */
  if (page === "map") {
    var mbox = document.getElementById("map-root"), pins = D2.pins || [];
    var OUT = [[61.6,25.1],[61.6,26.2],[63.2,26.6],[63.2,27.2],[62.7,28.3],[61.8,29.0],[60.9,29.85],[62.5,29.4],[64.1,29.5],[66.3,30.9],[67.8,31.6],[69.3,31.9],[69.5,33.0],[70.1,33.9],[71.1,34.1],[71.1,34.6],[71.5,35.5],[71.2,36.1],[71.6,36.8],[72.8,36.9],[74.6,37.0],[75.3,36.9],[75.9,36.6],[76.5,35.9],[77.8,35.5],[77.0,35.1],[76.0,34.7],[75.0,34.6],[74.3,34.8],[73.9,34.6],[74.2,34.0],[74.0,33.4],[74.6,32.8],[74.7,32.4],[74.4,32.0],[74.6,31.6],[74.6,31.0],[74.0,30.4],[73.1,29.9],[72.9,29.0],[71.9,28.0],[70.9,27.9],[70.2,27.3],[70.0,26.2],[69.5,25.6],[68.9,24.4],[68.2,23.7],[67.4,24.2],[67.0,24.8],[66.5,25.4],[64.5,25.2],[62.3,25.2]];
    var px = function (lon) { return Math.round((lon - 60.4) * 40); }, py = function (lat) { return Math.round((37.2 - lat) * 40); };
    var svg = '<svg viewBox="0 0 700 560" role="img" aria-label="Map of Pakistan with story pins"><polygon class="land" points="' + OUT.map(function (p) { return px(p[0]) + "," + py(p[1]); }).join(" ") + '"/>' +
      pins.map(function (p, n) {
        var x = px(p.lon), y = py(p.lat), live = !!p.url;
        return '<g class="pin' + (live ? "" : " soon") + '" tabindex="0" role="link" data-n="' + n + '" aria-label="' + esc(p.name) + (live ? ": open report" : ": report coming soon") + '"><circle cx="' + x + '" cy="' + y + '" r="8"/><text x="' + (x + p.dx) + '" y="' + (y + p.dy) + '" text-anchor="' + (p.a || "start") + '">' + esc(p.name) + "</text></g>";
      }).join("") + "</svg>";
    mbox.innerHTML = '<div class="mapbox">' + svg + '</div><p class="map-msg" id="map-msg" role="status" aria-live="polite">Tap a pin to open the report from that place. Grey pins are on their way.</p>' +
      '<div class="map-list">' + pins.map(function (p) {
        return '<div class="card"><span class="label' + (p.url ? " red" : "") + '">' + (p.url ? "Report" : "Coming soon") + "</span><h3>" + esc(p.name) + "</h3>" +
          (p.url ? '<a class="btn" style="padding:5px 14px;font-size:.88rem" href="' + esc(p.url) + '" target="_blank" rel="noopener">Watch report</a>' : "<p>Report coming soon.</p>") + "</div>";
      }).join("") + "</div>";
    var open = function (g) {
      var p = pins[+g.getAttribute("data-n")];
      if (p.url) { document.getElementById("map-msg").textContent = "Opening the " + p.name + " report…"; window.open(p.url, "_blank", "noopener"); }
      else document.getElementById("map-msg").textContent = p.name + ": report coming soon. Asher is still on the road.";
    };
    mbox.querySelectorAll(".pin").forEach(function (g) {
      g.addEventListener("click", function () { open(g); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(g); } });
    });
  }
})();
