/* ===================================================================
   LOCAL CONFIG TEMPLATE  —  copy this file to  config.local.js
   -------------------------------------------------------------------
   config.local.js is GIT-IGNORED, so your real keys never get pushed
   to GitHub (avoids secret-scanning alerts). Each template loads it
   right after data.js, and it fills in the real values here.

   Setup:
     1. cp config.example.js config.local.js
     2. paste your real Firebase web config below (from the Firebase
        console → Project settings → Your apps → Web app).
     3. on your VM/host, drop the same config.local.js next to the files.
   Leave apiKey:"" to run without Firebase (graceful fallback).
   =================================================================== */
Object.assign(window.FIREBASE, {
  apiKey:     "",
  authDomain: "",
  projectId:  "",
  appId:      "",
});

/* (optional) you can also keep music here instead of data.js: */
// Object.assign(window.MUSIC, { youtube:"https://youtu.be/XXXXXXXXXXX" });
