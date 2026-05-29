/* Firebase (Firestore) integration — live RSVP, wishes, book claims.
   Config comes from window.FIREBASE (set in data.js). If it's empty, this
   module sets window.WB.ready=false and the game degrades gracefully.

   Firestore security rules to paste (Firestore → Rules) — lets guests add
   entries and read them, but not edit/delete others' entries:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{db}/documents {
       match /wishes/{id}   { allow read, create: if true; }
       match /rsvps/{id}    { allow read, create: if true; }
       match /bookClaims/{id}{ allow read: if true;
                               allow create: if !exists(/databases/$(db)/documents/bookClaims/$(id)); }
     }
   }
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, addDoc, doc, setDoc,
  query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const cfg = window.FIREBASE || {};
if (cfg.apiKey) {
  try {
    const db = getFirestore(initializeApp(cfg));
    window.WB = {
      ready: true,
      addWish: (name, msg) =>
        addDoc(collection(db, "wishes"), { name, msg, ts: serverTimestamp() }),
      watchWishes: (cb) =>
        onSnapshot(query(collection(db, "wishes"), orderBy("ts", "desc")),
          (s) => cb(s.docs.map((d) => d.data()))),
      addRSVP: (data) =>
        addDoc(collection(db, "rsvps"), { ...data, ts: serverTimestamp() }),
      watchClaims: (cb) =>
        onSnapshot(collection(db, "bookClaims"),
          (s) => { const m = {}; s.forEach((d) => (m[d.id] = d.data())); cb(m); }),
      // create-only (rules block overwrite) → first claimer wins
      claimBook: (idx, by) =>
        setDoc(doc(db, "bookClaims", String(idx)), { by, ts: serverTimestamp() }),
    };
  } catch (e) {
    console.error("Firebase init failed:", e);
    window.WB = { ready: false, error: String(e) };
  }
} else {
  window.WB = { ready: false };
}
window.dispatchEvent(new Event("wb-ready"));
