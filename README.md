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
├── index.html          ← landing page (lists the themes; noindex — guests never see it)
├── data.js             ← ✏️ ALL your wording (window.WEDDING) + music + Firebase stub
├── config.example.js   ← copy to config.local.js (git-ignored) for real Firebase keys
├── photos/             ← ✏️ ALL your images (shared by every theme)
│   ├── couple.png  bride.jpg  groom.jpg  cafe.jpg  proposal.jpg  venue.jpg
│   ├── og-image.jpg       (WhatsApp/social link preview — keep under 600 KB)
│   └── _placeholder.png   (auto-fallback for any missing photo)
├── firebase.js         ← live RSVP / wishes / book-checkouts (optional, free tier)
├── music.js            ← YouTube background music + guest playlist widget
├── fx.js               ← small opening-effect helper (petals / dust / typewriter)
├── opener.js           ← animated envelope opening shared by themes
│
├── tools/              ← host-only helpers (not linked from any guest page)
│   ├── admin.html      ← private dashboard: RSVPs, headcount, wishes, CSV export
│   └── invites.html    ← WhatsApp invite-link generator (offline, per-guest links)
├── check.js            ← pre-launch checker:  node check.js
├── deploy.sh           ← single-theme production build:  ./deploy.sh <theme> [domain]
│
├── game/  storybook/  library/  scroll/  editorial/
├── cinema/  travel/  gothic/  premium/  keraton/     ← the themes (see table below)
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

Open `data.js` and replace the demo (Kafka & Milena) content:

- **Names / date / venue** — `bride`, `groom`, `date` (ISO + timezone, powers the
  countdown & calendar), `venueName`, `venueAddress`, `mapsQuery`, `dress`.
- **Your story** — the `story[]` array (each beat = a chapter/page/spot).
- **Schedule** — the `agenda[]` array.
- **Profiles** — `brideFull` / `groomFull` / parents / `*Ig` (optional Instagram).
- **Turut mengundang** — `turutMengundang[]`: extended family who also invite
  (plain strings, e.g. `"Keluarga Besar … — Solo"`). Themes render the section
  only when the array is non-empty.
- **Live streaming** — `streaming: { url, label, time }` for guests who can't
  attend. Themes show the link only when `url` is set.
- **Gift (books only, no money)** — `gift.note`, `gift.whatsapp`,
  `gift.whatsappText` (guests WhatsApp you for the shipping address).
- **RSVP fallbacks** — `rsvpWhatsapp`, `rsvpEmail` (see chain below).
- **Site URL** — `siteUrl`: the absolute URL used for og:image / share links.

### RSVP fallback chain

Every theme tries these in order, so RSVP always does something honest:

1. **Firebase** (if `config.local.js` has real keys) → saved live to Firestore.
2. **WhatsApp** (`rsvpWhatsapp` set) → opens a pre-filled wa.me chat.
3. **E-mail** (`rsvpEmail` set) → opens a pre-filled mailto.
4. **Neither** → the form shows an honest *"couldn't send — contact us
   directly"* message instead of a fake success.

`node check.js` warns you when both fallbacks are empty.

### Photos
Drop images into **`photos/`** with these names (used by all themes):
`couple.png`, `bride.jpg`, `groom.jpg`, and one per story beat
(`cafe.jpg`, `proposal.jpg`), plus `venue.jpg`. Missing files fall back to
`_placeholder.png`. Keep `og-image.jpg` under **600 KB** or WhatsApp will skip
the link preview.

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
Without it, the site still works — see the RSVP fallback chain above; the
guestbook/book-claims show a "set up Firebase" note.

1. Create a project at <https://console.firebase.google.com> → add a **Web app**.
2. Enable **Firestore Database**.
3. Copy `config.example.js` → `config.local.js` (git-ignored) and paste the web
   config there. **Never** put real keys in `data.js` — it's committed.
4. Add the security rules shown at the top of `firebase.js` (they also power
   the admin dashboard: guests can submit, only the signed-in couple can read
   RSVPs or delete wishes).
5. For the dashboard: enable **Email/Password** sign-in and create one couple
   account (details in the `firebase.js` comment and in `tools/admin.html`).
6. On a custom domain later, add that domain under Firebase → Authentication →
   **Authorized domains**.

---

## Host tools (`tools/` — private, never link these to guests)

### `tools/admin.html` — couple's dashboard
Open `…/tools/admin.html`, sign in with the couple's Firebase e-mail/password.
Shows the live **RSVP list** (name, attendance, guest count, `?to=` slug,
timestamp), a **headcount summary** (attending / not / total guests), the
**wishes list with per-wish delete**, and **CSV export** of all RSVPs
(client-side download). Needs the updated Firestore rules from `firebase.js`
and one Email/Password account. Shows a setup notice if Firebase isn't
configured. `noindex`, and not linked from anywhere guest-facing.

### `tools/invites.html` — WhatsApp invite generator
Fully offline: paste a guest list (one per line, `Name` or
`Name, 62812345678`), pick the theme and tweak the Bahasa Indonesia message
template (`{name}` / `{link}` tokens). You get a personalized `?to=` link per
guest, a copy button, an **"Open WhatsApp"** button when a phone number is
given (pre-filled wa.me message), and **copy-all as CSV** for spreadsheets.

### `check.js` — pre-launch checker
```bash
node check.js     # exit code 1 if anything FAILs
```
Checks: leftover `[placeholders]`, gift/RSVP contact fields, Firebase config,
music, every referenced photo, `og-image.jpg` size, `og:title`/`og:image` in
every theme, name drift in og:titles, and leftover demo names. Run it before
every deploy.

### `deploy.sh` — production build
```bash
./deploy.sh scroll                      # → dist/ with scroll at the root
./deploy.sh scroll wedding.example.com  # + rewrites siteUrl/og: URLs to the domain
```
Builds `dist/` with the chosen theme's `index.html` at the root, copies all
shared files + `photos/` + the theme's assets, and rewrites `../` paths to
`./`. Upload `dist/` to the VM web root — then **copy `config.local.js` in
manually** (it's git-ignored and never included in the build).

---

## Sharing links

- **Personalised greeting:** add `?to=Name` →
  `…/library/?to=Sarah` shows "Dear Sarah".
- **Deep-link a section:** add `?open=rsvp` (or `gift`, `wishes`, `venue`, a story
  id…) → opens straight to it, in **all themes**. Handy for "RSVP here" buttons.

(URL-encode spaces: `?to=Budi%20%26%20Sari` — or let `tools/invites.html` do it
for you.)

---

## Themes

| Folder | Name | Vibe | Opening |
|---|---|---|---|
| `game/` | A Stroll Through Town | playful pixel side-scroller you walk through | title → enter town |
| `storybook/` | Our Story Scrapbook | warm flip-through scrapbook pages | album cover opens |
| `library/` | The Library of Us | a leather book; chapters w/ literary quotes, library-card RSVP, card-catalog book gift | book swings open |
| `scroll/` | The Long Scroll | one elegant scroll; parallax florals, reveal-on-scroll | envelope opens |
| `editorial/` | Editorial Cover | crisp magazine layout, big type | cover peels |
| `cinema/` | Cinephile Premiere | movie-premiere poster & ticket RSVP | curtain rises |
| `travel/` | Travel Journal | stamped journal pages & maps | journal opens |
| `gothic/` | Gothic Invitation | candlelit, dramatic serif romance | seal breaks |
| `premium/` | Premium Interactive | polished florals, smooth interactions | gate opens |
| `keraton/` | Keraton | Javanese elegance, full Bahasa Indonesia | gunungan opens |

All themes share `data.js`, `photos/`, `firebase.js`, `music.js`, `opener.js`.

---

## Deploy

### Showcase (current — GitHub Pages)
Just for trying the themes. Push to `main`; Pages serves the repo root:
`https://<user>.github.io/<repo>/` (chooser) and `…/library/` etc.

### Production (VM + your domain — the real plan)

1. **Check first:** `node check.js` — fix every FAIL.
2. **Build one theme:** `./deploy.sh <theme> yourdomain.com` → `dist/`.
3. **Copy `dist/` to the VM** (e.g. `/var/www/wedding`) and drop your
   `config.local.js` next to `index.html` (deploy.sh reminds you — it's
   git-ignored, so it's never in the build).
4. **Serve it** with nginx or Caddy. Example Caddy (auto-HTTPS):
   ```
   yourdomain.com {
     root * /var/www/wedding
     file_server
   }
   ```
   Or nginx: a `server` block with `root /var/www/wedding;` + a TLS cert
   (Let's Encrypt / certbot).
5. **Point your domain** (A/AAAA record) at the VM's IP.
6. If using Firebase, add `yourdomain.com` to its **Authorized domains**.

No database/server code to run — it's all static + Firebase (if enabled).

---

## Credits
Pixel art: 2D Pixel City Pack (CC-BY) · LPC characters (CC-BY-SA). Fonts via
Google Fonts. Music via the YouTube IFrame Player API.
