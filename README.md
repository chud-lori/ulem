# 💍 Wedding Invitation — multi-theme, interactive

A set of **interactive wedding-invitation templates** that all share one set of
content. Pick a theme; they're built as plain static files (HTML/CSS/JS) — no
build step, no framework.

> **Note:** GitHub Pages here is only for **showcase / experimenting** with the
> themes. The real invitation will move to a **VM + proper domain** once a theme
> is chosen (see [Deploy](#deploy)).

---

## What's inside

```
.
├── index.html        ← landing page (lists the themes)
├── data.js           ← ✏️ ALL your wording (window.WEDDING) + music config
├── photos/           ← ✏️ ALL your images (shared by every theme)
│   ├── couple.png  bride.jpg  groom.jpg  cafe.jpg  proposal.jpg  venue.jpg
│   └── _placeholder.png   (auto-fallback for any missing photo)
├── firebase.js       ← live RSVP / wishes / book-checkouts (optional, free tier)
├── music.js          ← YouTube background music + guest playlist widget
├── fx.js             ← small opening-effect helper (petals / dust / typewriter)
│
├── game/             ← Theme: "A Stroll Through Town" (side-scroll pixel game)
├── storybook/        ← Theme: "Our Story Scrapbook" (flip-through pages)
└── library/          ← Theme: "The Library of Us" (a book you open)
```

**Everything you edit lives in two places:** `data.js` (words) and `photos/`
(pictures). Every theme reads from them, so you fill things in once.

---

## Run it locally

Because the templates use JS modules + fetch a few things, open them through a
local web server (not `file://`):

```bash
cd wedding-invitation
python3 -m http.server 8000
# then visit:
#   http://localhost:8000/             (theme chooser)
#   http://localhost:8000/library/     (a specific theme)
```

Any static server works (`npx serve`, `php -S`, nginx, Caddy, VS Code Live Server…).

---

## Personalise (edit `data.js`)

Open `data.js` and replace everything in `[BRACKETS]`:

- **Names / date / venue** — `bride`, `groom`, `date` (ISO + timezone, powers the
  countdown & calendar), `venueName`, `venueAddress`, `mapsQuery`, `dress`.
- **Your story** — the `story[]` array (each beat = a chapter/page/spot).
- **Schedule** — the `agenda[]` array.
- **Profiles** — `brideFull` / `groomFull` / parents / `*Ig` (optional Instagram).
- **Gift (books only, no money)** — `gift.note`, `gift.sendTo`, `gift.wishlist[]`.

### Photos
Drop images into **`photos/`** with these names (used by all themes):
`couple.png`, `bride.jpg`, `groom.jpg`, and one per story beat
(`cafe.jpg`, `proposal.jpg`), plus `venue.jpg`. Missing files fall back to
`_placeholder.png`.

### Music
In `data.js` → `window.MUSIC`:
```js
window.MUSIC = {
  youtube:"https://youtu.be/XXXXXXXXXXX",   // background track (starts on first tap)
  loop:true, title:"Our Song", by:"Artist",
  playlist:[ { title:"…", by:"…", youtube:"https://youtu.be/…" } ],  // optional
};
```
A floating ♪ button + playlist panel appears. Leave empty for no music.

---

## Live RSVP, wishes & book check-outs (Firebase — optional, free)

Static hosting can't store data, so these use **Firebase Firestore** (free tier).
Without it, the site still works: RSVP falls back to e-mail/thank-you, and the
guestbook/book-claims show a "set up Firebase" note.

1. Create a project at <https://console.firebase.google.com> → add a **Web app**.
2. Enable **Firestore Database**.
3. Paste the web config values into `window.FIREBASE` in `data.js`.
4. Add the security rules shown at the top of `firebase.js`.
5. On a custom domain later, add that domain under Firebase → Auth → **Authorized
   domains** (and Firestore allowed origins).

---

## Sharing links

- **Personalised greeting:** add `?to=Name` →
  `…/library/?to=Sarah` shows "Dear Sarah".
- **Deep-link a section:** add `?open=rsvp` (or `gift`, `wishes`, `venue`, a story
  id…) → opens straight to it. Handy for "RSVP here" buttons.

(URL-encode spaces: `?to=Budi%20%26%20Sari`.)

---

## Themes

| Folder | Name | Vibe | Opening |
|---|---|---|---|
| `game/` | A Stroll Through Town | playful pixel side-scroller you walk through | title → enter town |
| `storybook/` | Our Story Scrapbook | warm flip-through scrapbook pages | album cover opens |
| `library/` | The Library of Us | a leather book; chapters w/ literary quotes, library-card RSVP, card-catalog book gift | **book swings open** |

All three share `data.js`, `photos/`, `firebase.js`, `music.js`.

---

## Deploy

### Showcase (current — GitHub Pages)
Just for trying the themes. Push to `main`; Pages serves the repo root:
`https://<user>.github.io/<repo>/` (chooser) and `…/library/` etc.

### Production (VM + your domain — the real plan)
It's a static site, so any web server works:

1. **Pick one theme.** Either point guests at `https://yourdomain.com/library/`,
   or copy that theme's `index.html` to the web root and keep `../data.js`,
   `../photos/`, etc. alongside it (adjust the `../` paths to match where you put
   them).
2. **Copy the files** to the VM (e.g. `/var/www/wedding`).
3. **Serve them** with nginx or Caddy. Example Caddy (auto-HTTPS):
   ```
   yourdomain.com {
     root * /var/www/wedding
     file_server
   }
   ```
   Or nginx: a `server` block with `root /var/www/wedding;` + a TLS cert
   (Let's Encrypt / certbot).
4. **Point your domain** (A/AAAA record) at the VM's IP.
5. If using Firebase, add `yourdomain.com` to its **Authorized domains**.

No database/server code to run — it's all static + Firebase (if enabled).

---

## Credits
Pixel art: 2D Pixel City Pack (CC-BY) · LPC characters (CC-BY-SA). Fonts via
Google Fonts. Music via the YouTube IFrame Player API.
