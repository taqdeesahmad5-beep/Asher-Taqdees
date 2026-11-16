/* extras.js: entrance popup (fun/formal), back-to-top, Featured Work, Reports tabs, Quiz, Story Map */
(function () {
  var D = window.SITE || {}, D2 = window.SITE2 || {};
  var page = document.body.getAttribute("data-page") || "";
  var root = document.documentElement;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  /* remember the visitor's choice reliably: localStorage, then cookie, then sessionStorage */
  function get(k) {
    try { var v = window.localStorage.getItem(k); if (v) return v; } catch (e) {}
    try { var m = document.cookie.match(new RegExp("(?:^|; )" + k + "=([^;]*)")); if (m) return decodeURIComponent(m[1]); } catch (e) {}
    try { var s2 = window.sessionStorage.getItem(k); if (s2) return s2; } catch (e) {}
    return null;
  }
  function set(k, v) {
    try { window.localStorage.setItem(k, v); } catch (e) {}
    try { document.cookie = k + "=" + encodeURIComponent(v) + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
    try { window.sessionStorage.setItem(k, v); } catch (e) {}
  }
  var WA = "https://wa.me/923330447979";

  /* ---------- look: fun or formal ---------- */
  var mode = get("siteMode") === "formal" ? "formal" : "fun";
  function applyMode(m) {
    mode = m; if (m === "formal") root.setAttribute("data-theme", "formal"); else root.removeAttribute("data-theme");
    set("siteMode", m);
  }
  if (mode === "formal") root.setAttribute("data-theme", "formal");

  
  var pre = document.getElementById("pre-theme"); if (pre) pre.remove();

  /* ---------- entrance popup ---------- */
  var isBot = /bot|crawl|spider|slurp|lighthouse|pagespeed/i.test(navigator.userAgent || "");
  if (!get("siteMode") && !isBot && page !== "404") showEntrance();
  function showEntrance() {
    var d = document.createElement("div");
    d.className = "ent"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", "How would you like to meet me?");
    d.innerHTML =
      '<h2>How would you like to meet me?</h2>' +
      '<button type="button" class="side fun" data-m="fun"><b>Keep it fun</b><span class="go">Let’s go</span></button>' +
      '<button type="button" class="side for" data-m="formal"><b>Keep it formal</b><span class="go">Continue</span></button>' +
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
        '<div class="body"><p class="vt" data-vid="' + v.id + '">' + esc(t) + '</p><a class="btn" href="' + url + '" target="_blank" rel="noopener">' + (mode === "formal" ? "Watch on YouTube" : "Watch (popcorn optional)") + "</a></div></article>";
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
      var changed = false, next = 0, running = 0, LIMIT = 6;
      function paint(id, t) {
        var els = grid.querySelectorAll('.vt[data-vid="' + id + '"]');
        for (var i = 0; i < els.length; i++) els[i].textContent = t;
      }
      function finish() {
        if (changed) { set("ytTitles", JSON.stringify(cache)); draw(); }
      }
      function pump() {
        while (running < LIMIT && next < todo.length) {
          (function (v) {
            running++;
            var ctl = window.AbortController ? new AbortController() : null;
            var tm = ctl ? setTimeout(function () { ctl.abort(); }, 8000) : null;
            fetch("https://noembed.com/embed?url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + v.id), ctl ? { signal: ctl.signal } : {})
              .then(function (r) { return r.json(); })
              .then(function (j) { if (j && j.title) { titles[v.id] = j.title; cache[v.id] = j.title; changed = true; paint(v.id, j.title); } })
              .catch(function () {})
              .then(function () {
                if (tm) clearTimeout(tm);
                running--;
                if (next < todo.length) pump(); else if (running === 0) finish();
              });
          })(todo[next++]);
        }
      }
      if (todo.length) pump();
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
