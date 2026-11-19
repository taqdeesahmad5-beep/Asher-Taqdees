/* extras.js: back-to-top, Featured Work, Reports tabs, Quiz, Story Map */
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

  var sm = document.querySelector("#site-footer small");
  if (sm) sm.innerHTML = "&copy; " + new Date().getFullYear() + " Asher Taqdees. All rights reserved.";
  document.querySelectorAll(".vcard .btn").forEach(function (b) { b.textContent = "Watch on YouTube"; });

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
        '<div class="body"><p class="vt" data-vid="' + v.id + '">' + esc(t) + '</p><a class="btn" href="' + url + '" target="_blank" rel="noopener">' + "Watch on YouTube" + "</a></div></article>";
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

  /* ---------- sliders: video rows in the Archive page scroll sideways ---------- */
  document.querySelectorAll(page === "work" ? "main .grid" : ".grid[data-videos]").forEach(function (g) {
    if (!g.children.length) return;
    g.classList.add("slider");
    var w = document.createElement("div"); w.className = "slwrap";
    g.parentNode.insertBefore(w, g); w.appendChild(g);
    var p = document.createElement("button"), n = document.createElement("button");
    p.type = n.type = "button"; p.className = "sl-btn prev"; n.className = "sl-btn next";
    p.setAttribute("aria-label", "Scroll left"); n.setAttribute("aria-label", "Scroll right");
    p.textContent = "\u2039"; n.textContent = "\u203A";
    w.appendChild(p); w.appendChild(n);
    function upd() {
      var more = g.scrollWidth > g.clientWidth + 8, kids = g.children, total = kids.length;
      p.disabled = g.scrollLeft < 8; n.disabled = g.scrollLeft + g.clientWidth >= g.scrollWidth - 8;
      w.classList.toggle("more-r", more && !n.disabled); w.classList.toggle("more-l", more && !p.disabled);
      p.hidden = n.hidden = !more;
    }
    function step(dir) { g.scrollBy({ left: dir * Math.max(260, g.clientWidth * 0.85), behavior: "smooth" }); }
    p.addEventListener("click", function () { step(-1); });
    n.addEventListener("click", function () { step(1); });
    g.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd); upd();
  });

  /* ---------- Quiz: 10 random questions from the bank (data2.js), different each time ---------- */
  if (page === "quiz") {
    var BANK = D2.quiz || [], box = document.getElementById("quiz-root"), cur = [], i = 0, score = 0;
    var shuffle = function (a) { for (var k = a.length - 1; k > 0; k--) { var r = Math.floor(Math.random() * (k + 1)), t = a[k]; a[k] = a[r]; a[r] = t; } return a; };
    var pick = function () {
      var seen = []; try { seen = JSON.parse(get("quizSeen") || "[]"); } catch (e) {}
      var all = BANK.map(function (_, n) { return n; });
      var fresh = all.filter(function (n) { return seen.indexOf(n) < 0; });
      if (fresh.length < 10) { seen = []; fresh = all; }          /* bank used up: start over */
      var chosen = shuffle(fresh.slice()).slice(0, 10);
      set("quizSeen", JSON.stringify(seen.concat(chosen)));
      return chosen.map(function (n) {
        var q = BANK[n], right = q[1][q[2]], opts = shuffle(q[1].slice());
        return { q: q[0], o: opts, c: opts.indexOf(right), e: q[3] || "" };
      });
    };
    var start = function () { cur = pick(); i = 0; score = 0; ask(); window.scrollTo({ top: 0 }); };
    var ask = function () {
      var q = cur[i];
      box.innerHTML = '<div class="card quiz"><div class="q-top"><span>Question ' + (i + 1) + ' of ' + cur.length + '</span><span>Score: ' + score + '</span></div>' +
        '<div class="q-bar"><i style="width:' + (i / cur.length * 100) + '%"></i></div><h2 style="font-size:1.35rem">' + esc(q.q) + '</h2><div class="q-opts">' +
        q.o.map(function (o, k) { return '<button type="button" class="q-opt" data-k="' + k + '">' + esc(o) + "</button>"; }).join("") +
        '</div><p class="q-fb" role="status" aria-live="polite"></p><button type="button" class="btn" id="q-next" hidden>' + (i === cur.length - 1 ? "See my score" : "Next") + "</button></div>";
      var opts = box.querySelectorAll(".q-opt");
      opts.forEach(function (b) {
        b.addEventListener("click", function () {
          var ok = +b.getAttribute("data-k") === q.c;
          if (ok) score++;
          opts.forEach(function (o) { o.disabled = true; });
          opts[q.c].classList.add("right"); if (!ok) b.classList.add("wrong");
          box.querySelector(".q-fb").textContent = (ok ? "Correct! " : "Not quite. ") + q.e;
          box.querySelector(".q-top span:last-child").textContent = "Score: " + score;
          var n = document.getElementById("q-next"); n.hidden = false; n.focus();
        });
      });
      document.getElementById("q-next").addEventListener("click", function () { i++; if (i < cur.length) ask(); else finish(); });
    };
    var finish = function () {
      var win = score >= 7;
      box.innerHTML = '<div class="card quiz" style="text-align:center"><div class="q-bar"><i style="width:100%"></i></div><p style="margin:0;font-weight:700">Your score</p><div class="q-score">' + score + ' / ' + cur.length + '</div><p>' +
        (win ? "You nailed it! Check your prize." : "So close. You need 7 to win the coffee. Play again for 10 brand-new questions!") + '</p><div class="btn-row" style="justify-content:center"><button type="button" class="btn" id="q-again">Play again (new questions)</button>' +
        (win ? '<button type="button" class="btn alt" id="q-prize">Show my prize</button>' : "") + "</div></div>";
      document.getElementById("q-again").addEventListener("click", start);
      if (win) { document.getElementById("q-prize").addEventListener("click", prize); prize(); }
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
    if (box && BANK.length >= 10) start();
  }

  /* ---------- Story Map (outline traced from the Pakistan map with Kashmir) ---------- */
  if (page === "map") {
    var mbox = document.getElementById("map-root"), pins = D2.pins || [];
    var OUT = [509,160,499,152,490,148,485,134,485,127,472,127,465,123,454,121,447,114,439,115,432,108,432,96,428,89,424,87,417,87,411,81,399,78,385,84,370,83,347,85,339,89,332,90,322,97,317,97,315,102,307,109,315,116,318,122,318,133,314,142,306,146,303,151,304,166,297,172,272,172,272,175,279,179,281,193,274,198,263,199,260,212,256,217,256,231,253,239,250,242,241,242,234,239,224,238,216,243,214,254,191,255,188,260,178,269,176,297,150,306,130,305,120,310,92,309,84,311,74,311,58,307,41,299,34,298,36,302,46,311,52,326,59,333,71,338,78,344,84,345,84,374,93,374,96,376,96,387,93,395,75,396,69,403,65,404,59,409,58,418,53,424,53,436,58,440,59,438,71,438,76,434,101,436,105,432,121,432,132,437,136,434,143,434,146,431,178,430,187,436,187,446,201,452,204,461,204,469,215,478,226,478,232,474,241,472,242,465,276,466,283,462,289,462,291,464,299,463,301,461,300,448,291,431,291,428,288,424,279,423,276,417,277,399,268,396,261,391,261,382,263,377,275,365,279,356,283,353,290,353,296,360,305,356,317,354,324,350,331,340,334,331,351,318,355,313,356,307,362,296,368,291,377,287,378,277,393,261,393,236,412,226,416,220,423,219,428,213,429,203,433,200,444,196,454,196,468,204,480,203,485,211,492,212,495,217,499,213,506,213,508,217,512,219,519,213,516,198,506,185,504,179,504,169];
    var S = 1.4, OX = 24, OY = 68;
    var mx = function (x) { return Math.round((x - OX) * S); }, my = function (y) { return Math.round((y - OY) * S); };
    var poly = []; for (var q = 0; q < OUT.length; q += 2) poly.push(mx(OUT[q]) + "," + my(OUT[q + 1]));
    var svg = '<svg viewBox="0 0 708 590" role="img" aria-label="Map of Pakistan with story pins"><polygon class="land" points="' + poly.join(" ") + '"/>' +
      pins.map(function (p, n) {
        var x = mx(p.x), y = my(p.y), live = !!p.url;
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
