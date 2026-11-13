/* ============================================================
   EDIT THIS FILE TO UPDATE THE SITE. No other file needs touching.
   After editing, re-upload the folder to Cloudflare Pages.
   ============================================================ */

window.SITE = {

  /* ---- Recent Work (videos page) ----
     Add a new video by pasting its YouTube ID (the part after v= or youtu.be/).
     Titles are fetched automatically. To force your own title, add: title: "My title" */
  videos: [
    { id: "wQBU1x1roho" },
    { id: "uCApHuucBag" },
    { id: "kjDBv_pftTE" },
    { id: "AV4j9XKyA_E" },
    { id: "YxPlcyfCnXg" },
    { id: "SZu2KrBUZ4c" },
    { id: "ZydrIrwMK18" },
    { id: "kH1i_pJwYlg" },
    { id: "_0CvlTYvGfE" },
    { id: "eeB5CKcKHOo" },
    { id: "wITCl852R-Q" },
    { id: "orjWVJpgWm0" },
    { id: "8bYknFcSNQM" },
    { id: "vWcf8dP5qjE" },
    { id: "4Q1P1-QhG5Y" },
    { id: "zfOhBSYLSHs" },
    { id: "HJo-KiLWfZU" },
    { id: "I-daCDY09hY" },
    { id: "SBqHxTa8Iis" },
    { id: "EGdIS1-Hv3E" },
    { id: "zSOR06Ds8AE" },
    { id: "rBSDEsF60ts" },
    { id: "9uFQ_oOW0Sw" },
    { id: "0seOuC0Dqo8" },
    { id: "YQYi9O0rLj4" },
    { id: "t6Zq5XqQ_iY" },
    { id: "x6LlzweNpRY" },
    { id: "QgYry8NX1YE" },
    { id: "fk06Xk8ddnE" },
    { id: "2zcXxWE1Rak" },
    { id: "KtJIo4gnukA" },
    { id: "hZS-gwV_JRE" },
    { id: "dQBGUrTxgBI" },
    { id: "UK-sBX8Z1n0" },
    { id: "xly_0Zkphjg" }
  ],

  /* ---- Extra video cards on the Reports page ----
     Same rules as above: paste YouTube IDs, titles load automatically. */
  groups: {
    informative: [
      { id: "zfOhBSYLSHs" },
      { id: "x6LlzweNpRY" },
      { id: "8bYknFcSNQM" }
    ],
    explainers: [
      { id: "YxPlcyfCnXg", title: "Why is Sunday a day off?" },
      { id: "SZu2KrBUZ4c", title: "Why is meat not sold on Tuesdays and Wednesdays?" },
      { id: "wQBU1x1roho" }
    ]
  },

  /* ---- Snaps page (photos) ----
     1. Put the photo in the images/snaps/ folder.
     2. Add a line below, newest first. tag is optional: "BTS", "Work" or "Fun".
     caption is a short line shown under the photo. */
  snaps: [
    { image: "images/snaps/snap-04.jpg", tag: "Fun", caption: "Write your caption for photo 4." },
    { image: "images/snaps/snap-03.jpg", tag: "BTS", caption: "Write your caption for photo 3." },
    { image: "images/snaps/snap-02.jpg", tag: "Work", caption: "Write your caption for photo 2." },
    { image: "images/snaps/snap-01.jpg.jpg", tag: "Work", caption: "Press pass on, greenery all around." }
  ],

  /* ---- "Asher liked this on YouTube" page ----
     Paste YouTube IDs here. Newest first. Leave empty and the page shows a joke. */
  liked: [
    // { id: "XXXXXXXXXXX" },
  ],

  /* ---- Social feed page (Facebook / Instagram style) ----
     The page shows the first 4 posts. Newest first.
     platform: "fb" or "ig". image is optional (put the file in /images/).
     These 3 are SAMPLES: replace them with real posts. */
  posts: [
    { platform: "fb", date: "Sample", text: "Sample post. Replace this with your latest Facebook update.", link: "https://www.facebook.com/asher.taqdees/" },
    { platform: "ig", date: "Sample", text: "Sample post. Replace this with your latest Instagram caption.", link: "https://www.instagram.com/asher_taqdees/" },
    { platform: "fb", date: "Sample", text: "Sample post. Add the link of the original post so people can open it.", link: "https://www.facebook.com/asher.taqdees/" },
    { platform: "ig", date: "Sample", text: "Sample post. To add a photo use image: \"images/post1.jpg\".", link: "https://www.instagram.com/asher_taqdees/" }
  ]
};
