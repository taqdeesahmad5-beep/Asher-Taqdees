(function () {
  var page = document.body.getAttribute("data-page") || "";

  var nav = [
    ["index.html", "home", "Home"],
    ["about.html", "about", "About"],
    ["work.html", "work", "Reports"],
    ["videos.html", "videos", "Recent Work"],
    ["events.html", "events", "Workshops"],
    ["feed.html", "feed", "Feed"],
    ["snaps.html", "snaps", "Snaps"],
    ["ask.html", "ask", "Ask Me"],
    ["recommended.html", "recommended", "Recommended"],
    ["liked.html", "liked", "Liked"]
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
