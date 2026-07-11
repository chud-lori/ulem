#!/usr/bin/env node
/* ===================================================================
   PRE-LAUNCH CHECKER  —  run:  node check.js
   -------------------------------------------------------------------
   Sanity-checks data.js, photos/ and every theme before you send the
   link to 200 guests. Prints PASS / WARN / FAIL / INFO lines and
   exits 1 if anything FAILs (so you can gate deploy.sh on it).
   Node stdlib only — no dependencies.
   =================================================================== */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const read = (p) => fs.readFileSync(p, "utf8");

let fails = 0, warns = 0;
const ok   = (msg) => console.log("  PASS  " + msg);
const warn = (msg) => { warns++; console.log("  WARN  " + msg); };
const fail = (msg) => { fails++; console.log("  FAIL  " + msg); };
const info = (msg) => console.log("  INFO  " + msg);

/* ---------- load data.js in a tiny sandbox ---------- */
const dataPath = path.join(ROOT, "data.js");
if (!fs.existsSync(dataPath)) { console.error("FAIL  data.js not found next to check.js"); process.exit(1); }
const dataSrc = read(dataPath);

const fakeWindow = {};
try {
  // data.js only assigns onto `window`; give it a bare object to write to.
  new Function("window", dataSrc)(fakeWindow);
} catch (e) {
  console.error("  FAIL  data.js failed to evaluate: " + e.message);
  process.exit(1);
}
const W  = fakeWindow.WEDDING  || {};
const M  = fakeWindow.MUSIC    || {};
const FB = fakeWindow.FIREBASE || {};

console.log("\nPre-launch check — " + new Date().toISOString().slice(0, 10) + "\n");

/* ---------- 1. leftover [BRACKET] placeholders in data.js ---------- */
console.log("data.js");
{
  const lines = dataSrc.split("\n");
  const hits = [];
  lines.forEach((ln, i) => {
    // placeholder style: [Bride Name], [VENUE], [YOUR STORY] — starts uppercase,
    // no ] or newline inside; ignores normal array syntax like story: [
    const m = ln.match(/\[[A-Z][A-Za-z0-9 _'&\/.-]{1,50}\]/g);
    if (m) hits.push("line " + (i + 1) + ": " + m.join(", "));
  });
  if (hits.length) hits.forEach((h) => fail("leftover [placeholder] in data.js — " + h));
  else ok("no leftover [bracket] placeholders");
}

/* ---------- 2. gift.whatsapp ---------- */
{
  const g = (W.gift && W.gift.whatsapp) || "";
  if (!g || g === "6280000000000")
    warn("gift.whatsapp is " + (g ? "still the placeholder 6280000000000" : "empty") +
         " — guests can't ask for the shipping address");
  else ok("gift.whatsapp is set (" + g + ")");
}

/* ---------- 3. RSVP fallback chain ---------- */
if (!W.rsvpWhatsapp && !W.rsvpEmail)
  warn("rsvpWhatsapp AND rsvpEmail are both empty — without Firebase, RSVP has no fallback " +
       "(guests will see an honest 'couldn't send' message)");
else ok("RSVP fallback present (" + [W.rsvpWhatsapp && "WhatsApp", W.rsvpEmail && "e-mail"].filter(Boolean).join(", ") + ")");

/* ---------- 4. Firebase ---------- */
if (!FB.apiKey)
  warn("FIREBASE.apiKey is empty — live RSVP/wishes disabled (real keys belong in git-ignored config.local.js; " +
       "this checker only sees data.js defaults)");
else ok("FIREBASE.apiKey is set in data.js (careful: data.js is committed — prefer config.local.js)");

/* ---------- 5. music ---------- */
if (!M.youtube) info("MUSIC.youtube is empty — site will have no background music (that's fine)");
else ok("background music configured (" + M.youtube + ")");

/* ---------- 6. photos ---------- */
console.log("\nphotos/");
{
  const needed = new Set(["bride.jpg", "groom.jpg", "venue.jpg", "couple.png"]);
  (Array.isArray(W.story) ? W.story : []).forEach((s) => { if (s && s.photo) needed.add(s.photo); });
  [...needed].sort().forEach((f) => {
    if (fs.existsSync(path.join(ROOT, "photos", f))) ok("photos/" + f + " exists");
    else fail("photos/" + f + " is missing (referenced by the themes — placeholder art will show instead)");
  });
}

/* ---------- 7. og-image ---------- */
{
  const p = path.join(ROOT, "photos", "og-image.jpg");
  if (!fs.existsSync(p)) fail("photos/og-image.jpg is missing — WhatsApp link previews will be blank");
  else {
    const kb = Math.round(fs.statSync(p).size / 1024);
    if (kb >= 600) fail("photos/og-image.jpg is " + kb + " KB — WhatsApp skips previews over ~600 KB; compress it");
    else ok("photos/og-image.jpg exists (" + kb + " KB, under 600 KB)");
  }
}

/* ---------- 8+9. theme og tags ---------- */
console.log("\nthemes");
{
  const SKIP = new Set(["photos", "tools", "dist", "node_modules", ".git", ".claude"]);
  const themes = fs.readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !SKIP.has(d.name) && !d.name.startsWith(".") &&
                   fs.existsSync(path.join(ROOT, d.name, "index.html")))
    .map((d) => d.name).sort();
  if (!themes.length) warn("no theme folders with an index.html found");
  themes.forEach((t) => {
    const html = read(path.join(ROOT, t, "index.html"));
    const hasImg = /property=["']og:image["']/.test(html);
    const titleM = html.match(/property=["']og:title["'][^>]*content=["']([^"']*)["']/) ||
                   html.match(/content=["']([^"']*)["'][^>]*property=["']og:title["']/);
    if (!hasImg && !titleM) { fail(t + "/index.html has no og:image or og:title — link previews will be blank"); return; }
    if (!hasImg) fail(t + "/index.html is missing og:image");
    if (!titleM) { fail(t + "/index.html is missing og:title"); return; }
    const title = titleM[1];
    const bride = String(W.bride || ""), groom = String(W.groom || "");
    if (bride && groom && (!title.includes(bride) || !title.includes(groom)))
      warn(t + "/index.html og:title (\"" + title + "\") doesn't mention both " + groom + " & " + bride + " — stale names?");
    else if (hasImg) ok(t + "/index.html has og:image + og:title (\"" + title + "\")");
  });
}

/* ---------- 10. demo data ---------- */
console.log("\ndemo data");
if (/Kafka|Milena/.test(dataSrc))
  warn("demo data: 'Kafka' / 'Milena' still present in data.js — replace with your real names before launch");
else ok("no demo names (Kafka/Milena) left in data.js");

/* ---------- summary ---------- */
console.log("\n" + "-".repeat(60));
if (fails) console.log("RESULT: " + fails + " FAIL, " + warns + " WARN — fix the FAILs before deploying.");
else if (warns) console.log("RESULT: 0 FAIL, " + warns + " WARN — deployable, but read the WARNs.");
else console.log("RESULT: all checks passed. Ready to deploy.");
process.exit(fails ? 1 : 0);
