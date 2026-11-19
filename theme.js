/* theme.js: runs first in <head>. Sets the look before anything is painted, and shows the entrance screen. */
(function () {
  var de = document.documentElement;
  function rd(k) {
    var v = null;
    try { v = localStorage.getItem(k); } catch (e) {}
    if (!v) { try { var c = document.cookie.match(new RegExp("(?:^|; )" + k + "=([^;]*)")); if (c) v = decodeURIComponent(c[1]); } catch (e) {} }
    if (!v) { try { v = sessionStorage.getItem(k); } catch (e) {} }
    return v;
  }
  function wr(k, v) {
    try { localStorage.setItem(k, v); } catch (e) {}
    try { document.cookie = k + "=" + encodeURIComponent(v) + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
    try { sessionStorage.setItem(k, v); } catch (e) {}
  }
  /* FORMAL is the base look. Only "fun" adds the extra colourful layer. */
  var mode = rd("siteMode") === "fun" ? "fun" : "formal";
  if (mode === "fun") de.setAttribute("data-theme", "fun");

  /* entrance screen: once per visit (every new visit, not on every page click). Search-engine bots skip it. */
  var bot = /bot|crawl|spider|slurp|lighthouse|pagespeed|facebookexternalhit|whatsapp|telegram|preview/i.test(navigator.userAgent || "");
  var entered = false;
  try { entered = sessionStorage.getItem("entered") === "1"; } catch (e) {}
  if (!entered) { try { entered = /(?:^|; )entered=1/.test(document.cookie); } catch (e) {} }
  if (entered || bot) return;

  de.className += " ent-on";
  var d = document.createElement("div");
  d.className = "ent"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-label", "How would you like to meet me?");
  d.innerHTML =
    '<h2>How would you like to meet me?</h2>' +
    '<button type="button" class="side fun" data-m="fun"><b>Keep it fun</b><span class="go">Let’s go</span></button>' +
    '<button type="button" class="side for" data-m="formal"><b>Keep it formal</b><span class="go">Continue</span></button>' +
    '<span class="vs" aria-hidden="true">OR</span>';
  de.appendChild(d);
  d.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-m]") : null; if (!b) return;
    var pick = b.getAttribute("data-m");
    wr("siteMode", pick);
    try { sessionStorage.setItem("entered", "1"); } catch (e2) {}
    try { document.cookie = "entered=1; path=/; SameSite=Lax"; } catch (e3) {}   /* session cookie: gone when the browser closes */
    if (pick !== mode) { location.reload(); return; }                              /* different look: reload (overlay stays until the new page paints) */
    d.className += " out";
    setTimeout(function () { d.remove(); de.className = de.className.replace(/\s*ent-on/, ""); }, 350);
  });
})();
