// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRyZn5qG1EODvJKPmXp-6vZJqqw0pfc3U",
  authDomain: "clicktrip-b551d.firebaseapp.com",
  projectId: "clicktrip-b551d",
  storageBucket: "clicktrip-b551d.firebasestorage.app",
  messagingSenderId: "636924465131",
  appId: "1:636924465131:web:29f9efbacea0da74b353ae",
  measurementId: "G-X6TWXXLW12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);