(function () {
  var page = document.body.getAttribute("data-page") || "";

  var nav = [
    ["index.html", "home", "Home"],
    ["about.html", "about", "About"],
    ["work.html", "work", "Archive"],
    ["videos.html", "videos", "Reports"],
    ["feed.html", "feed", "Feed"],
    ["quiz.html", "quiz", "Quiz"],
    ["map.html", "map", "Story Map"],
    ["ask.html", "ask", "Ask Me"],
    ["recommended.html", "recommended", "Recommended"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap"><div class="brand"><a class="logo" href="/">Asher <span>Taqdees</span></a></div><nav>' +
      nav.map(function (n) {
        return '<a href="/' + n[0] + '"' + (n[1] === page ? ' class="active"' : "") + ">" + n[2] + "</a>";
      }).join("") +
      "</nav></div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    /* banner above the footer, on every page */
    var bn = document.createElement("div");
    bn.className = "banner-ayah";
    bn.innerHTML = '<p lang="ar" dir="rtl">\u0648\u064E\u0647\u064F\u0648\u064E \u0639\u064E\u0644\u064E\u0649\u0670 \u0643\u064F\u0644\u0651\u0650 \u0634\u064E\u064A\u0652\u0621\u064D \u0642\u064E\u062F\u0650\u064A\u0631\u064C</p>';
    footer.parentNode.insertBefore(bn, footer);
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="wrap"><div class="links">' +
      '<a href="https://www.facebook.com/asher.taqdees/" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="https://www.instagram.com/asher_taqdees/" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="https://www.linkedin.com/in/taqdees5ive/" target="_blank" rel="noopener">LinkedIn</a>' +
      '<a href="https://urdu.arynews.tv/author/taqdees-ahmed/" target="_blank" rel="noopener">ARY News articles</a>' +
      "</div><small>&copy; " + new Date().getFullYear() +
      " Asher Taqdees. Built completely on autopilot. No actual thinking was involved in this masterpiece</small></div>";
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function videoCard(v, caption) {
    var url = "https://www.youtube.com/watch?v=" + v.id;
    var title = v.title ? esc(v.title) : "Loading title...";
    return (
      '<article class="card vcard">' +
      '<a class="thumb" href="' + url + '" target="_blank" rel="noopener" aria-label="Watch on YouTube">' +
      '<img loading="lazy" decoding="async" src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt=""></a>' +
      '<div class="body">' +
      (caption ? '<span class="cap">' + esc(caption) + "</span>" : "") +
      '<p class="vt" data-vid="' + v.id + '"' + (v.title ? ' data-fixed="1"' : "") + ">" + title + "</p>" +
      '<a class="btn" href="' + url + '" target="_blank" rel="noopener">Watch on YouTube</a>' +
      "</div></article>"
    );
  }

  function loadTitle(el) {
    var id = el.getAttribute("data-vid");
    var u = "https://noembed.com/embed?url=" + encodeURIComponent("https://www.youtube.com/watch?v=" + id);
    fetch(u).then(function (r) { return r.json(); }).then(function (d) {
      el.textContent = d && d.title ? d.title : "Watch on YouTube";
    }).catch(function () { el.textContent = "Watch on YouTube"; });
  }

  /* titles load only when a card scrolls near the screen (keeps phones smooth) */
  function fillTitles(root) {
    var els = root.querySelectorAll(".vt:not([data-fixed])");
    if (!("IntersectionObserver" in window)) { els.forEach(loadTitle); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.unobserve(e.target); loadTitle(e.target); }
      });
    }, { rootMargin: "300px" });
    els.forEach(function (el) { io.observe(el); });
  }

  var data = window.SITE || {};

  var grid = document.getElementById("video-grid");
  if (grid) {
    grid.innerHTML = (data.videos || []).map(function (v) { return videoCard(v); }).join("");
    fillTitles(grid);
  }

  var liked = document.getElementById("liked-grid");
  if (liked) {
    var list = data.liked || [];
    if (!list.length) {
      liked.innerHTML = '<div class="card"><span class="label red">Empty</span><h3>Nothing liked yet.</h3><p>Asher\'s thumb is resting. Check back soon.</p></div>';
    } else {
      liked.innerHTML = list.map(function (v) { return videoCard(v, "Asher liked this on YouTube 👍"); }).join("");
      fillTitles(liked);
    }
  }

  /* extra video cards appended to any grid with data-videos="key" (keys live in data.js "groups") */
  document.querySelectorAll("[data-videos]").forEach(function (g) {
    var list = (data.groups || {})[g.getAttribute("data-videos")] || [];
    g.insertAdjacentHTML("afterbegin", list.map(function (v) { return videoCard(v, v.cap || g.getAttribute("data-cap") || ""); }).join(""));
    fillTitles(g);
  });

  var snapGrid = document.getElementById("snap-grid");
  if (snapGrid) {
    var snaps = data.snaps || [];
    if (!snaps.length) {
      snapGrid.innerHTML = '<div class="card"><span class="label red">Empty</span><h3>No snaps yet.</h3><p>The camera roll is still loading.</p></div>';
    } else {
      snapGrid.innerHTML = snaps.map(function (s, i) {
        return '<button type="button" class="snap" data-i="' + i + '"><img loading="lazy" decoding="async" src="/' + esc(String(s.image).replace(/^\//, "")) + '" alt="' + esc(s.caption || "Snap by Asher Taqdees") + '">' +
          '<span class="cap">' + (s.tag ? '<span class="label">' + esc(s.tag) + "</span>" : "") + esc(s.caption || "") + "</span></button>";
      }).join("");
      var lb = document.getElementById("lightbox");
      var lbImg = lb.querySelector("img"), lbCap = lb.querySelector("p");
      snapGrid.addEventListener("click", function (e) {
        var b = e.target.closest(".snap");
        if (!b) return;
        var s = snaps[+b.getAttribute("data-i")];
        lbImg.src = "/" + String(s.image).replace(/^\//, "");
        lbCap.textContent = s.caption || "";
        lb.hidden = false;
      });
      lb.addEventListener("click", function () { lb.hidden = true; });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") lb.hidden = true; });
    }
  }

  var feed = document.getElementById("feed-posts");
  if (feed) {
    var posts = (data.posts || []).slice(0, 4);
    feed.innerHTML = posts.map(function (p) {
      var isFb = p.platform === "fb";
      return (
        '<div class="post"><div class="post-head"><div class="avatar">AT</div>' +
        "<div><b>Asher Taqdees</b><small>" + esc(p.date || "") + "</small></div>" +
        '<span class="badge ' + (isFb ? "fb" : "ig") + '">' + (isFb ? "Facebook" : "Instagram") + "</span></div>" +
        "<div>" + esc(p.text || "") + "</div>" +
        (p.image ? '<img class="pimg" loading="lazy" src="' + esc(p.image) + '" alt="">' : "") +
        '<div class="post-actions"><span>👍 Like</span><span>💬 Comment</span>' +
        (p.link ? '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">Open original</a>' : "") +
        "</div></div>"
      );
    }).join("");
  }
})();

/* ===== MOBILE MENU (3 bars): phone shows Home, About, Archive, Ask Me + a small menu button ===== */
(function () {
  var KEEP = ["/index.html", "/about.html", "/work.html", "/ask.html"];
  function setup() {
    var header = document.querySelector(".site-header"), nav = header && header.querySelector("nav");
    if (!nav || nav.querySelector(".mm-burger")) return;
    var links = nav.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) if (KEEP.indexOf(links[i].getAttribute("href")) === -1) links[i].classList.add("mm-extra");

    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "mm-burger"; btn.setAttribute("aria-label", "Open menu"); btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "<span></span><span></span><span></span>";
    nav.insertBefore(btn, nav.firstChild);
    btn.addEventListener("click", function () {
      var open = header.classList.toggle("mm-open");
      btn.setAttribute("aria-expanded", open); btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    var css = document.createElement("style");
    css.textContent =
      ".mm-burger{display:none}" +
      "@media (max-width:760px){" +
      ".site-header nav{width:100%;flex-wrap:wrap;align-items:center;gap:6px;margin-top:4px}" +
      ".site-header nav a{font-size:.9rem;padding:5px 11px}" +
      ".mm-burger{display:flex;order:-1;margin-right:2px;flex-direction:column;justify-content:center;align-items:center;gap:4px;width:34px;height:34px;padding:0;background:transparent;border:2px solid var(--cream);border-radius:8px;cursor:pointer}" +
      ".mm-burger span{display:block;width:16px;height:2px;border-radius:2px;background:var(--cream);transition:transform .2s,opacity .2s}" +
      ".mm-open .mm-burger{background:var(--red);border-color:var(--red)}" +
      ".mm-open .mm-burger span:nth-child(1){transform:translateY(6px) rotate(45deg)}" +
      ".mm-open .mm-burger span:nth-child(2){opacity:0}" +
      ".mm-open .mm-burger span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}" +
      ".site-header nav a.mm-extra{display:none;order:2;flex:1 0 100%;border-radius:10px;padding:10px 14px;font-size:1rem;background:rgba(255,255,255,.08)}" +
      ".mm-open nav a.mm-extra{display:block}" +
      "}" +
      "@media (max-width:380px){.site-header nav a{font-size:.85rem;padding:5px 9px}}";
    document.head.appendChild(css);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup); else setup();
})();

/* ===== VISITOR BAR: real numbers from GoatCounter (bot-filtered, counted site-wide) ===== */
(function () {
  var page = document.body.getAttribute("data-page") || "";
  if (!page || page === "404") return;
  var GC = "https://ashertaqdees.goatcounter.com";
  var store = null; try { store = window.localStorage; } catch (e) {}

  /* visit the site once with ?owner=1 to stop counting your own visits on that browser */
  try { if (/[?&]owner=1/.test(location.search) && store) { store.setItem("noCount", "1"); store.setItem("skipgc", "t"); } } catch (e) {}

  var today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });   /* YYYY-MM-DD, Pakistan time */

  function count(qs) {
    var ctl = window.AbortController ? new AbortController() : null;
    var t = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
    return fetch(GC + "/counter/TOTAL.json" + qs, ctl ? { signal: ctl.signal } : {})
      .then(function (r) { if (t) clearTimeout(t); if (!r.ok) throw new Error("x"); return r.json(); })
      .then(function (j) { var n = parseInt(String(j.count).replace(/[^0-9]/g, ""), 10); if (isNaN(n)) throw new Error("x"); return n; })
      .catch(function () { return 0; });
  }

  function fmt(n) { try { return n.toLocaleString("en-US"); } catch (e) { return String(n); } }
  function msgFor(td, total) {
    if (td > 0) return "<b>" + fmt(td) + "</b> " + (td === 1 ? "person" : "people") + " visited this site today" + (total > td ? " &middot; <b>" + fmt(total) + "</b> visits in total" : "");
    return "<b>" + fmt(total) + "</b> visits in total";
  }

  function whenFree(cb) { cb(); }

  var bar = null, dismissed = false;
  function show(td, total) {
    if (dismissed) return;
    whenFree(function () {
      if (dismissed) return;
      if (bar) { bar.querySelector(".vbm").innerHTML = msgFor(td, total); return; }   /* already open: just refresh the numbers */
      var css = document.createElement("style");
      css.textContent =
        ".vb{position:fixed;left:50%;bottom:16px;transform:translate(-50%,30px);opacity:0;max-width:calc(100vw - 28px);background:var(--ink);color:var(--cream);border:3px solid var(--yellow);border-radius:14px;box-shadow:4px 4px 0 var(--red);padding:10px 38px 10px 14px;font-size:.9rem;line-height:1.35;z-index:900;transition:transform .4s cubic-bezier(.2,.9,.3,1.2),opacity .4s}" +
        ".vb.on{transform:translate(-50%,0);opacity:1}" +
        ".vb b{color:var(--yellow)}" +
        ".vb button{position:absolute;top:2px;right:4px;width:30px;height:30px;border:0;background:transparent;color:var(--cream);font-size:1.3rem;line-height:1;cursor:pointer}" +
        "@media (prefers-reduced-motion:reduce){.vb{transition:none}}";
      document.head.appendChild(css);
      bar = document.createElement("div");
      bar.className = "vb"; bar.setAttribute("role", "status");
      bar.innerHTML = "<span aria-hidden=\"true\">👀</span> <span class=\"vbm\">" + msgFor(td, total) + "</span><button type=\"button\" aria-label=\"Close\">&times;</button>";
      document.body.appendChild(bar);
      var close = function () { dismissed = true; bar.classList.remove("on"); setTimeout(function () { bar.remove(); css.remove(); }, 450); };
      bar.querySelector("button").addEventListener("click", close);
      requestAnimationFrame(function () { requestAnimationFrame(function () { bar.classList.add("on"); }); });   /* slides in straight away */
      setTimeout(close, 14000);
    });
  }

  /* last numbers we got today: shown at once on the next page, then refreshed from GoatCounter */
  var cacheKey = "vb-gc";
  try {
    var cj = JSON.parse((store && store.getItem(cacheKey)) || "null");
    if (cj && cj.day === today && cj.total > 0) show(cj.td, cj.total);
  } catch (e) {}

  Promise.all([count("?start=" + today + "T00:00:00%2B05:00&end=" + today + "T23:59:59%2B05:00"), count("")]).then(function (v) {
    if (v[1] < 1) return;   /* nothing counted yet (or counter unreachable): stay quiet */
    try { store && store.setItem(cacheKey, JSON.stringify({ day: today, td: v[0], total: v[1] })); } catch (e) {}
    show(v[0], v[1]);
  });
})();

/* ===== faster navigation: warm up a page when the visitor is about to tap it ===== */
(function () {
  var c = navigator.connection || {};
  if (c.saveData || /2g/.test(c.effectiveType || "")) return;
  var done = {};
  function warm(e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || a.target === "_blank" || a.origin !== location.origin || a.pathname === location.pathname || done[a.pathname]) return;
    done[a.pathname] = 1;
    var l = document.createElement("link"); l.rel = "prefetch"; l.href = a.pathname; document.head.appendChild(l);
  }
  document.addEventListener("pointerover", warm, { passive: true });
  document.addEventListener("touchstart", warm, { passive: true });
})();

/* ===== smooth page transitions for browsers without cross-page View Transitions (Safari, Firefox) ===== */
(function () {
  if ("onpageswap" in window) return;                       /* Chrome/Edge/Android already cross-fade (see style.css) */
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (calm || !document.body || !document.body.animate) return;
  document.body.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "none" }], { duration: 380, easing: "cubic-bezier(.2,.7,.2,1)" });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== "_self") return;
    if (a.origin !== location.origin || a.hasAttribute("download")) return;
    if (a.pathname === location.pathname && a.search === location.search) return;
    e.preventDefault();
    var go = a.href;
    var anim = document.body.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" });
    anim.onfinish = function () { location.href = go; };
    setTimeout(function () { location.href = go; }, 400);
  });
  window.addEventListener("pageshow", function (e) { if (e.persisted) document.body.getAnimations().forEach(function (x) { x.cancel(); }); });
})();
