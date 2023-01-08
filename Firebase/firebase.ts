import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
/*
const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});
*/
const app = initializeApp({
  apiKey: "AIzaSyCRayctUofHeREqhQndqszR0R6pbvasW9k",
  authDomain: "amtimer-e1af0.firebaseapp.com",
  projectId: "amtimer-e1af0",
  storageBucket: "amtimer-e1af0.appspot.com",
  messagingSenderId: "394893954130",
  appId: "1:394893954130:web:32b5ac62491aa0b504a38b",
  measurementId: "G-E6L44Q5S2W",
});

//const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;
