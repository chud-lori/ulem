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
  bride:"[Bride]",  groom:"[Groom]",                 // short, shown big
  brideFull:"[Bride Full Name]", groomFull:"[Groom Full Name]",
  brideParents:"Daughter of [Mr. Father] &amp; [Mrs. Mother]",
  groomParents:"Son of [Mr. Father] &amp; [Mrs. Mother]",
  brideIg:"", groomIg:"",                            // instagram handle, no @ (optional)

  /* --- when & where --- */
  date:"2026-12-12T16:00:00+07:00",                  // ISO + timezone → countdown & calendar
  dateLabel:"Saturday, 12 December 2026",
  ceremonyTime:"4:00 PM",
  venueName:"[Venue Name]",
  venueAddress:"[Full venue address]",
  mapsQuery:"[Venue Name, City]",                    // Google Maps search
  dress:"[Garden formal · pastels welcome]",

  /* --- love-story beats (add/remove freely) --- */
  story:[
    { id:"cafe", icon:"☕", label:"How We Met", title:"Where It All Began", photo:"cafe.jpg",
      html:`<p>It started at <span class="ph">[the little café on (street)]</span>, over
            <span class="ph">[two coffees and a shared umbrella]</span>.</p>
            <p>Neither of us knew an ordinary <span class="ph">[Tuesday]</span> would
            become the rest of our lives. 💛</p>` },
    { id:"proposal", icon:"💍", label:"The Proposal", title:"The Big Question", photo:"proposal.jpg",
      html:`<p>On <span class="ph">[the date]</span>, under <span class="ph">[the old oak in the park]</span>,
            one of us got down on one knee…</p><p>and the other said <b>YES!</b> ✨</p>` },
  ],

  /* --- order of the day --- */
  agenda:[
    { time:"[3:30]", label:"Guests arrive" },
    { time:"[4:00]", label:"Ceremony 💐" },
    { time:"[5:00]", label:"Cocktails &amp; photos 📸" },
    { time:"[6:30]", label:"Dinner &amp; speeches 🥂" },
    { time:"[8:00]", label:"Dancing till late 🕺" },
  ],

  /* --- GIFT = BOOKS ONLY (no money). Guests claim a book to send you. --- */
  gift:{
    note:"No money, no flowers — we're building our home library! 📚<br/>If you'd like to bless us, send us a <b>book you love</b>. Pick one below so we don't get duplicates.",
    sendTo:"[Your Name] · [Full shipping address] · [City, ZIP] · [Phone]",
    wishlist:[
      { title:"[Book title 1]", author:"[Author]", link:"" },
      { title:"[Book title 2]", author:"[Author]", link:"" },
      { title:"[Book title 3]", author:"[Author]", link:"" },
      { title:"Surprise us!", author:"any book you love", link:"" },
    ],
  },

  /* --- RSVP e-mail fallback if you DON'T use Firebase ("" = none) --- */
  rsvpEmail:"",
};

/* -------------------------------------------------------------------
   FIREBASE (live RSVP + wishes + book claims). Free tier, shared by
   all templates. Leave apiKey:"" to run without it (graceful fallback).
   Setup steps are in firebase.js.
   ------------------------------------------------------------------- */
window.FIREBASE = {
  apiKey:"",
  authDomain:"",
  projectId:"",
  appId:"",
};
