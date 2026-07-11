/* ===================================================================
   SHARED WEDDING DATA  —  EDIT THIS ONE FILE
   -------------------------------------------------------------------
   Every template (game/, and future themes) reads window.WEDDING from
   here, so all of them stay in sync. This file is THEME-AGNOSTIC:
   it holds the *content* (names, dates, story, photos), never how a
   particular theme looks. Each template adds its own presentation.

   Photos live in ONE shared folder used by every template:  /photos/
   Drop your images there once, named:
     bride.jpg, groom.jpg, cafe.jpg, proposal.jpg, venue.jpg, couple.png
   Missing files fall back to _placeholder.png automatically.

   LANGUAGE — the fields below are the English content. The optional
   `id:{…}` block near the bottom holds Bahasa Indonesia overrides for
   the same fields; Bahasa-first themes (keraton, premium, scroll with
   ?lang=id — the default) use those values and fall back to the
   English ones for anything you leave out. Delete the whole `id`
   block to serve identical content in every language.
   =================================================================== */

window.WEDDING = {
  /* --- names --- */
  bride: "Milena",
  groom: "Kafka", // short, shown big
  brideFull: "Milena Jesenská",
  groomFull: "Franz Kafka",
  brideParents: "Daughter of Jan Jesenský &amp; Milena Hejzlarová",
  groomParents: "Son of Hermann Kafka &amp; Julie Löwy",
  brideIg: "",
  groomIg: "", // instagram handle, no @ (optional)

  /* --- when & where --- */
  date: "2026-12-12T16:00:00+07:00", // ISO + timezone → countdown & calendar
  dateLabel: "Saturday, 12 December 2026",
  ceremonyTime: "4:00 PM",
  venueName: "Solo",
  venueAddress: "Solo, Indonesia",
  mapsQuery: "Solo, Indonesia", // Google Maps search (venue name + city works best)
  dress: "Outdoor smart casual · earth tones welcome",

  /* --- love-story beats (add/remove freely) --- */
  story: [
    {
      id: "cafe",
      icon: "🥾",
      label: "Our Story",
      title: "Where Our Path Began",
      photo: "cafe.jpg",
      html: `<p>It started with a simple hello, a shared curiosity, and the kind of conversation
            that made the road feel shorter.</p>
            <p>Since then, our favorite stories have been written between trail dust, long rides,
            quiet views, and pages from books we love.</p>`,
    },
    {
      id: "proposal",
      icon: "🏔️",
      label: "Lookout",
      title: "The View We Chose",
      photo: "proposal.jpg",
      html: `<p>Somewhere between planning the next trip and dreaming about the next book,
            we realized the best journey would be the one we take together.</p>
            <p>So here we are, ready for the next chapter.</p>`,
    },
  ],

  /* --- order of the day --- */
  agenda: [
    { time: "3:30 PM", label: "Guests arrive" },
    { time: "4:00 PM", label: "Wedding ceremony" },
    { time: "5:00 PM", label: "Photos &amp; warm greetings" },
    { time: "6:30 PM", label: "Dinner &amp; stories" },
    { time: "8:00 PM", label: "Music, laughter, and the next chapter" },
  ],

  /* --- turut mengundang (extended family who also invite) ---
     Rendered by themes only when non-empty. Plain strings. */
  turutMengundang: [
    // "Keluarga Besar Jesenský — Praha",
    // "Keluarga Besar Kafka — Wien",
  ],

  /* --- live streaming (for guests who can't attend) ---
     Rendered by themes only when url is set. --- */
  streaming: {
    url: "", // e.g. YouTube Live / Zoom / Google Meet link
    label: "Watch the ceremony live",
    time: "", // optional, e.g. "4:00 PM WIB"
  },

  /* --- GIFT = BOOKS ONLY (no money / no bank transfer). --- */
  gift: {
    note: "Your presence and prayers are more than enough for us.<br/>We don't accept cash gifts or transfers. If you'd still like to send something, we would be grateful for a <b>book you love</b> for our little home library.",
    whatsapp: "6280000000000", // use international format, e.g. 6281234567890
    whatsappText:
      "Hi Franz & Milena, I'd like to send a book as a wedding gift. Could you share the shipping address?",
  },

  /* --- RSVP fallbacks if you DON'T use Firebase ---
     Themes try Firebase first; without it they offer WhatsApp, then
     e-mail. With neither set, forms show an honest "couldn't send —
     contact us directly" message instead of a fake success. --- */
  rsvpWhatsapp: "", // international format, e.g. "6281234567890"
  rsvpEmail: "",

  /* --- absolute site URL, used for og:image / share links.
     Showcase = GitHub Pages; switch to your domain for production. --- */
  siteUrl: "https://chud-lori.github.io/ulem",

  /* --- BAHASA INDONESIA CONTENT (optional overrides) -----------------
     Same shapes as the English fields above. Themes rendering in
     Bahasa Indonesia read these first and fall back to the English
     values for anything missing:
       · scalar fields (dateLabel, ceremonyTime, dress, *Parents)
         simply replace their English counterpart;
       · story[] items are matched to the English ones by `id` and
         merged (icon/photo stay shared, label/title/html translated);
       · agenda[] replaces the whole English agenda when present;
       · gift{} is merged key-by-key.
     If `dateLabel` is omitted, themes derive it from `date` via
     Intl.DateTimeFormat("id-ID"). Times use 24-hour WIB format. --- */
  id: {
    dateLabel: "Sabtu, 12 Desember 2026",
    ceremonyTime: "16.00 WIB",
    brideParents: "Putri dari Bapak Jan Jesenský &amp; Ibu Milena Hejzlarová",
    groomParents: "Putra dari Bapak Hermann Kafka &amp; Ibu Julie Löwy",
    dress: "Rapi santai untuk acara luar ruang · warna-warna alam dipersilakan",
    story: [
      {
        id: "cafe",
        label: "Kisah Kami",
        title: "Awal Perjalanan Kami",
        html: `<p>Semua berawal dari sapaan sederhana, rasa ingin tahu yang sama, dan obrolan
              yang membuat perjalanan terasa lebih singkat.</p>
              <p>Sejak saat itu, kisah-kisah favorit kami tertulis di antara debu jalur pendakian,
              perjalanan panjang, pemandangan yang teduh, dan halaman buku-buku kesayangan kami.</p>`,
      },
      {
        id: "proposal",
        label: "Puncak Bukit",
        title: "Pemandangan yang Kami Pilih",
        html: `<p>Di antara rencana perjalanan berikutnya dan mimpi tentang buku berikutnya,
              kami menyadari bahwa perjalanan terbaik adalah perjalanan yang kami tempuh bersama.</p>
              <p>Maka di sinilah kami, siap melangkah ke babak yang baru.</p>`,
      },
    ],
    agenda: [
      { time: "15.30", label: "Tamu tiba" },
      { time: "16.00", label: "Akad nikah" },
      { time: "17.00", label: "Foto bersama &amp; ramah tamah" },
      { time: "18.30", label: "Makan malam &amp; berbagi cerita" },
      { time: "20.00", label: "Musik, tawa, dan babak yang baru" },
    ],
    gift: {
      note: "Kehadiran dan doa restu Anda sudah lebih dari cukup bagi kami.<br/>Kami tidak menerima hadiah uang maupun transfer. Namun jika Bapak/Ibu/Saudara/i berkenan memberikan sesuatu, kami akan sangat berbahagia menerima <b>buku yang Anda cintai</b> untuk perpustakaan kecil di rumah kami.",
      whatsappText:
        "Halo Franz & Milena, saya ingin mengirimkan buku sebagai hadiah pernikahan. Boleh minta alamat pengirimannya?",
    },
  },
};

/* -------------------------------------------------------------------
   MUSIC — plays a YouTube track as background music (starts on the first
   tap, because browsers block silent autoplay). Optionally give guests a
   PLAYLIST they can open and pick from. Shared by every template.
   Paste a normal YouTube link (or just the video id) — both work.
   Leave youtube:"" and playlist:[] for no music.
   ------------------------------------------------------------------- */
window.MUSIC = {
  youtube: "", // background track, e.g. "https://youtu.be/450p7goxZqg"
  loop: true, // loop the background track
  title: "",
  by: "", // optional label for the background track
  playlist: [
    // optional — guests can browse & play these
    // { title:"Can't Help Falling in Love", by:"Elvis", youtube:"https://youtu.be/vGJTaP6anOU" },
    // { title:"First Day of My Life",        by:"Bright Eyes", youtube:"https://youtu.be/U6tcWofH2nM" },
  ],
};

/* -------------------------------------------------------------------
   FIREBASE (live RSVP + wishes + book claims). Free tier.
   ⚠️ Do NOT put your real key here — this file IS committed to git.
   Put real values in  config.local.js  (git-ignored; copy it from
   config.example.js). It loads after this file and fills these in.
   This empty default keeps the site working (graceful fallback) when
   config.local.js isn't present. Setup steps are in firebase.js.
   ------------------------------------------------------------------- */
window.FIREBASE = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: "",
};
