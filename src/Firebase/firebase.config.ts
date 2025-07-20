// firebase.config.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import type { FirebaseApp } from "firebase/app"; // Optional for typing

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEXDuWFJrSHweQ0czIPNtDMJfKITk6jNI",
  authDomain: "mini-event-scedeuler.firebaseapp.com",
  projectId: "mini-event-scedeuler",
  storageBucket: "mini-event-scedeuler.firebasestorage.app",
  messagingSenderId: "585987218326",
  appId: "1:585987218326:web:50dfa874d222530ce8dbb7"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Export initialized app and auth
export const auth = getAuth(app);
// export default app;






// import { initializeApp } from "firebase/app";


// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyCEXDuWFJrSHweQ0czIPNtDMJfKITk6jNI",
//   authDomain: "mini-event-scedeuler.firebaseapp.com",
//   projectId: "mini-event-scedeuler",
//   storageBucket: "mini-event-scedeuler.firebasestorage.app",
//   messagingSenderId: "585987218326",
//   appId: "1:585987218326:web:50dfa874d222530ce8dbb7"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);