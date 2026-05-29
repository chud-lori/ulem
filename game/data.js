/* ===================================================================
   WEDDING DETAILS  —  EDIT THIS FILE ONLY
   -------------------------------------------------------------------
   This is the only file you need to change to personalise the invite.
   The game code (index.html) reads these two consts at load time.

   • Replace anything in [BRACKETS] with your real details.
   • To add photos: drop images into  game/assets/photos/  named
     cafe.jpg, proposal.jpg, venue.jpg, reception.jpg, rsvp.jpg
   • Each spot has: id, building, icon, sign, photo, title, html.
     Keep the structure; just edit the text inside.
   =================================================================== */

const WEDDING = {
  bride:"[BRIDE]", groom:"[GROOM]",
  spots:[
    { id:"cafe", building:"shop", icon:"☕", sign:"How We Met", photo:"cafe.jpg",
      title:"Where It All Began",
      html:`<p>It started at <span class="ph">[the little café on (street)]</span>, over
            <span class="ph">[two coffees and a shared umbrella]</span>.</p>
            <p>Neither of us knew an ordinary <span class="ph">[Tuesday]</span> would
            become the rest of our lives. 💛</p>` },

    { id:"proposal", building:"park", icon:"💍", sign:"The Proposal", photo:"proposal.jpg",
      title:"The Big Question",
      html:`<p>On <span class="ph">[the date]</span>, under <span class="ph">[the old oak in the park]</span>,
            one of us got down on one knee…</p><p>and the other said <b>YES!</b> ✨</p>` },

    { id:"venue", building:"apartment", icon:"💒", sign:"The Wedding", photo:"venue.jpg",
      title:"You're Invited!",
      html:`<div class="detail"><span class="k">When</span><span><span class="ph">[Saturday, Month DD, YYYY]</span><br/><span class="ph">[Ceremony 4:00 PM]</span></span></div>
            <div class="detail"><span class="k">Where</span><span><span class="ph">[Venue Name]</span><br/><span class="ph">[Full Address]</span></span></div>
            <div class="detail"><span class="k">Dress</span><span><span class="ph">[Garden formal · pastels welcome]</span></span></div>
            <div class="actions">
              <button class="btn mini" onclick="window.open('https://maps.google.com/?q=[Venue+Address]','_blank')">📍 Map</button>
              <button class="btn mini" onclick="addToCalendar()">📅 Calendar</button>
            </div>` },

    { id:"reception", building:"club", icon:"🎉", sign:"The Party", photo:"reception.jpg",
      title:"Order of the Day",
      html:`<div class="detail"><span class="k"><span class="ph">[3:30]</span></span><span>Guests arrive</span></div>
            <div class="detail"><span class="k"><span class="ph">[4:00]</span></span><span>Ceremony 💐</span></div>
            <div class="detail"><span class="k"><span class="ph">[5:00]</span></span><span>Cocktails &amp; photos 📸</span></div>
            <div class="detail"><span class="k"><span class="ph">[6:30]</span></span><span>Dinner &amp; speeches 🥂</span></div>
            <div class="detail"><span class="k"><span class="ph">[8:00]</span></span><span>Dancing till late 🕺</span></div>` },

    { id:"rsvp", building:"shop", icon:"💌", sign:"RSVP", photo:"rsvp.jpg",
      title:"Will You Join Us?",
      html:`<form id="rsvpForm">
              <div class="row"><label>Your name</label><input name="name" required placeholder="Type your name"/></div>
              <div class="row"><label>Will you attend?</label>
                <select name="attending"><option>Joyfully accepts 🎊</option><option>Sadly declines 💔</option></select></div>
              <div class="row"><label>Number of guests</label><input name="guests" type="number" min="1" value="1"/></div>
              <div class="row"><label>A note for us (song request, dietary needs…)</label><textarea name="note" rows="2"></textarea></div>
              <div class="actions"><button class="btn mini" type="submit">Send our RSVP 💕</button></div>
            </form>` },
  ]
};

// Leave "" to just show a thank-you. Put an email to open the guest's mail app.
const RSVP_EMAIL = "";
