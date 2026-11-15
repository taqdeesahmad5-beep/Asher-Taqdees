(function () {
  var page = document.body.getAttribute("data-page") || "";

  var nav = [
    ["index.html", "home", "Home"],
    ["about.html", "about", "About"],
    ["work.html", "work", "Archive"],
    ["videos.html", "videos", "Recent Work"],
    ["events.html", "events", "Workshops"],
    ["feed.html", "feed", "Feed"],
    ["ask.html", "ask", "Ask Me"],
    ["recommended.html", "recommended", "Recommended"]
  ];

  var header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<div class="wrap"><a class="logo" href="/">Asher <span>Taqdees</span></a><nav>' +
      nav.map(function (n) {
        return '<a href="/' + n[0] + '"' + (n[1] === page ? ' class="active"' : "") + ">" + n[2] + "</a>";
      }).join("") +
      "</nav></div>";
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    /* banner above the footer, on every page */
    var fl = document.createElement("link");
    fl.rel = "stylesheet";
    fl.href = "https://fonts.googleapis.com/css2?family=Amiri&display=swap";
    document.head.appendChild(fl);
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
      '<a class="btn" href="' + url + '" target="_blank" rel="noopener">Watch (popcorn optional)</a>' +
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
    g.insertAdjacentHTML("beforeend", list.map(function (v) { return videoCard(v, g.getAttribute("data-cap") || ""); }).join(""));
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

  /* ---------- motion for touch screens and scroll ---------- */
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var selectors = ".section-title,.card,.pill,.timeline .item,.snap,.facts li,main section > p,main section > .btn-row";

  function setupReveal() {
    var items = document.querySelectorAll(selectors);
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        io.unobserve(el);
        el.classList.add("in");
        setTimeout(function () { el.classList.remove("rv", "in"); el.style.removeProperty("--d"); }, 1100);
        if (!calm && (window.matchMedia("(hover: none)").matches)) {
          el.querySelectorAll(".jab").forEach(function (j) { j.classList.add("punch"); setTimeout(function () { j.classList.remove("punch"); }, 600); });
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    var n = 0, lastTop = -1;
    items.forEach(function (el) {
      if (el.closest(".hero") || el.closest("#lightbox")) return;
      var top = Math.round(el.getBoundingClientRect().top);
      n = Math.abs(top - lastTop) < 40 ? n + 1 : 0;
      lastTop = top;
      el.style.setProperty("--d", Math.min(n, 5) * 0.08 + "s");
      el.classList.add("rv");
      io.observe(el);
    });
  }

  /* video and snap cards are added by script, so reveal them after they exist */
  setupReveal();

  /* tap = punch: headings jab when tapped on touch screens (no cursor or glove on phones) */
  if (!calm) {
    document.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "touch") return;
      var j = e.target.closest && e.target.closest(".jab, h1, h2");
      if (j) {
        var t = j.classList.contains("jab") ? j : j.querySelector(".jab");
        if (t) { t.classList.remove("punch"); void t.offsetWidth; t.classList.add("punch"); setTimeout(function () { t.classList.remove("punch"); }, 600); }
      }
    }, { passive: true });
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

/* ===== HOME PAGE POPUP: appears after 1 minute on the home page (once per visit) ===== */
(function () {
  if (document.body.getAttribute("data-page") !== "home") return;
  try { if (sessionStorage.getItem("watchPopupSeen")) return; } catch (e) {}
  var seconds = 0, shown = false;
  var timer = setInterval(function () {
    if (document.hidden) return;              /* only counts time while the tab is open and visible */
    seconds++;
    if (seconds >= 60 && !shown) { shown = true; clearInterval(timer); show(); }
  }, 1000);

  function show() {
    try { sessionStorage.setItem("watchPopupSeen", "1"); } catch (e) {}
    var css = document.createElement("style");
    css.textContent =
      ".wp-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:20px;z-index:999;animation:wpfade .25s ease-out both}" +
      ".wp-box{position:relative;max-width:380px;width:100%;background:var(--cream);color:var(--ink);border:4px solid var(--ink);border-radius:16px;box-shadow:8px 8px 0 var(--red);padding:30px 24px 24px;text-align:center;animation:wppop .35s cubic-bezier(.2,.9,.3,1.3) both}" +
      ".wp-eyes{font-size:2.6rem;line-height:1;margin-bottom:8px}" +
      ".wp-box h2{font-size:1.4rem;line-height:1.2;margin:0 0 10px}" +
      ".wp-small{font-size:.95rem;margin:0 0 18px;opacity:.85}" +
      ".wp-x{position:absolute;top:8px;right:10px;width:34px;height:34px;border:0;background:transparent;font-size:1.6rem;line-height:1;cursor:pointer;color:var(--ink)}" +
      "@keyframes wpfade{from{opacity:0}to{opacity:1}}@keyframes wppop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}" +
      "@media (prefers-reduced-motion:reduce){.wp-ov,.wp-box{animation:none}}";
    document.head.appendChild(css);

    var ov = document.createElement("div");
    ov.className = "wp-ov";
    ov.innerHTML =
      '<div class="wp-box" role="dialog" aria-modal="true" aria-labelledby="wp-title">' +
      '<button type="button" class="wp-x" aria-label="Close">&times;</button>' +
      '<div class="wp-eyes" aria-hidden="true">👀</div>' +
      '<h2 id="wp-title">Asher Taqdees is Watching your activity!</h2>' +
      '<p class="wp-small">Just kidding. Don\'t worry.</p>' +
      '<button type="button" class="btn wp-ok">Phew, OK</button></div>';
    document.body.appendChild(ov);

    var prev = document.activeElement;
    function close() { ov.remove(); css.remove(); document.removeEventListener("keydown", key); if (prev && prev.focus) prev.focus(); }
    function key(e) { if (e.key === "Escape") close(); }
    ov.addEventListener("click", function (e) { if (e.target === ov) close(); });
    ov.querySelector(".wp-x").addEventListener("click", close);
    ov.querySelector(".wp-ok").addEventListener("click", close);
    document.addEventListener("keydown", key);
    ov.querySelector(".wp-ok").focus();
  }
})();
