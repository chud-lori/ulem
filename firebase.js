/* Firebase (Firestore) integration — live RSVP, wishes, book claims.
   Config comes from window.FIREBASE (set in data.js). If it's empty, this
   module sets window.WB.ready=false and the game degrades gracefully.

   Firestore security rules to paste (Firestore Database → Rules → Publish).
   Guests can submit; nobody can edit/delete; RSVPs are write-only (you read
   them in the Firebase console, so guests can't see who else is coming):

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // public guestbook: anyone may read & add a wish (size-capped)
       match /wishes/{id} {
         allow read: if true;
         allow create: if request.resource.data.name is string
                       && request.resource.data.msg is string
                       && request.resource.data.msg.size() < 1000;
       }
       // RSVPs: guests may submit, but NOT list/read others'
       match /rsvps/{id} { allow create: if true; allow read: if false; }
       // book check-outs: readable (to show "taken"); first claimer wins
       match /bookClaims/{id} {
         allow read: if true;
         allow create: if !exists(/databases/$(database)/documents/bookClaims/$(id));
       }
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
