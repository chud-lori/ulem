/* Firebase (Firestore) integration — live RSVP, wishes, book claims.
   Config comes from window.FIREBASE (set in data.js). If it's empty, this
   module sets window.WB.ready=false and the game degrades gracefully.

   Firestore security rules to paste (Firestore Database → Rules → Publish).
   Guests can submit but never edit; only the signed-in couple (via
   tools/admin.html) may list RSVPs or delete wishes. RSVPs stay unreadable
   to guests, so nobody can see who else is coming:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // public guestbook: anyone may read & add a wish (size-capped);
       // only the signed-in couple may delete (moderation via tools/admin.html)
       match /wishes/{id} {
         allow read: if true;
         allow create: if request.resource.data.name is string
                       && request.resource.data.msg is string
                       && request.resource.data.msg.size() < 1000;
         allow delete: if request.auth != null;
       }
       // RSVPs: guests may submit; only the signed-in couple may list/delete
       match /rsvps/{id} {
         allow create: if true;
         allow read, delete: if request.auth != null;
       }
       // book check-outs: readable (to show "taken"); first claimer wins
       match /bookClaims/{id} {
         allow read: if true;
         allow create: if !exists(/databases/$(database)/documents/bookClaims/$(id));
       }
     }
   }

   Admin setup (for tools/admin.html):
     1. Firebase console → Authentication → Sign-in method → enable
        Email/Password.
     2. Authentication → Users → Add user → create ONE account for the
        couple (that e-mail/password is the admin.html login). Don't add
        other users — anyone signed in can read RSVPs under these rules.
     3. Publish the rules above, then open tools/admin.html and sign in.
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
