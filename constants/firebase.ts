// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRayctUofHeREqhQndqszR0R6pbvasW9k",
  authDomain: "amtimer-e1af0.firebaseapp.com",
  projectId: "amtimer-e1af0",
  storageBucket: "amtimer-e1af0.appspot.com",
  messagingSenderId: "394893954130",
  appId: "1:394893954130:web:32b5ac62491aa0b504a38b",
  measurementId: "G-E6L44Q5S2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
