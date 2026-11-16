/* ============================================================
   data2.js  =  the small things you will edit most (new pages)
   ============================================================ */
window.SITE2 = {

  /* ---- Featured Work (3 small cards on the Home page) ---- */
  featured: [
    { id: "zSOR06Ds8AE", label: "Debt Report" },
    { id: "fk06Xk8ddnE", label: "Water Crisis" },
    { id: "hZS-gwV_JRE", label: "Robotic Library" }
  ],

  /* ---- Story Map pins ----
     To add a report later: paste its YouTube link in url: "..." for that place.
     Leave url as "" and the pin shows "Report coming soon".
     (lon, lat, dx, dy, a are only for placing the pin and its label. Don't change them.) */
  pins: [
    { name: "Chakwal",      lon: 72.86, lat: 32.93, url: "https://www.youtube.com/watch?v=Fh7cazsWWIg&t=2s", dx: -12, dy: 4,  a: "end" },
    { name: "Bhakkar",      lon: 71.08, lat: 31.63, url: "", dx: -12, dy: 4,  a: "end" },
    { name: "Lahore",       lon: 74.33, lat: 31.55, url: "", dx: 12,  dy: 6,  a: "start" },
    { name: "Muridke",      lon: 74.26, lat: 31.80, url: "", dx: 12,  dy: -6, a: "start" },
    { name: "Changa Manga", lon: 74.05, lat: 31.09, url: "", dx: -12, dy: 12, a: "end" },
    { name: "Muzaffarabad", lon: 73.47, lat: 34.37, url: "https://www.youtube.com/watch?v=do_LEcZHSkY", dx: 12, dy: 4, a: "start" },
    { name: "Swat",         lon: 72.33, lat: 34.78, url: "", dx: -12, dy: 4,  a: "end" }
  ],

  /* ---- Reports filter tabs ----
     Videos are sorted into tabs automatically from their titles.
     If one lands in the wrong tab, force it here:
     "VIDEO_ID": "investigations" | "general" | "explainers" | "promotions" */
  cats: {
    "YxPlcyfCnXg": "explainers",
    "SZu2KrBUZ4c": "explainers",
    "wQBU1x1roho": "explainers",
    "zfOhBSYLSHs": "explainers",
    "x6LlzweNpRY": "explainers",
    "8bYknFcSNQM": "explainers"
  },

  /* words in a title that decide the tab (lower case) */
  words: {
    investigations: ["drugs", "7553", "debt", "cheap ai", "ai tools", "basant", "boring water", "mafia", "scam", "investigat", "revelation"],
    explainers: ["explain", "why is", "why do", "why are", "what is", "how does"],
    promotions: ["launch", "campaign", "promo", "sponsor", "activation", "unveil", "brand"]
  }
};
