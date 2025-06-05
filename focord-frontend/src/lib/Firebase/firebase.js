// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "focord-97eec.firebaseapp.com",
  projectId: "focord-97eec",
  storageBucket: "focord-97eec.firebasestorage.app",
  messagingSenderId: "972177010051",
  appId: "1:972177010051:web:009abaa865d31e9ad1dab6",
  measurementId: "G-Z51PS840Y1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
