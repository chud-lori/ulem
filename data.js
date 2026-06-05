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
  mapsQuery: "[Venue Name, City]", // Google Maps search
  dress: "[Outdoor smart casual · earth tones welcome]",

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
    { time: "[3:30]", label: "Guests arrive" },
    { time: "[4:00]", label: "Wedding ceremony" },
    { time: "[5:00]", label: "Photos &amp; warm greetings" },
    { time: "[6:30]", label: "Dinner &amp; stories" },
    { time: "[8:00]", label: "Music, laughter, and the next chapter" },
  ],

  /* --- GIFT = BOOKS ONLY (no money / no bank transfer). --- */
  gift: {
    note: "Your presence and prayers are more than enough for us.<br/>We don't accept cash gifts or transfers. If you'd still like to send something, we would be grateful for a <b>book you love</b> for our little home library.",
    whatsapp: "6280000000000", // use international format, e.g. 6281234567890
    whatsappText:
      "Hi Franz & Milena, I'd like to send a book as a wedding gift. Could you share the shipping address?",
  },

  /* --- RSVP e-mail fallback if you DON'T use Firebase ("" = none) --- */
  rsvpEmail: "",
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
