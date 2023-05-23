import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDjVlEumpyuMWM846LHKh7W5UeerInDlc",
  authDomain: "https://eternals-events.netlify.app/",
  projectId: "uas-pti-8f2c8",
  storageBucket: "uas-pti-8f2c8.appspot.com",
  messagingSenderId: "569867826029",
  appId: "1:569867826029:web:abb1f73ecd54c9ade12064",
  measurementId: "G-LHE1JYNDSP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
