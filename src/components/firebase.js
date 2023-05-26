// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC_bQqsgkd7QeYWeGzira-UPfhLJ39gok",
  authDomain: "eternal-s-events.firebaseapp.com",
  databaseURL:
    "https://eternal-s-events-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eternal-s-events",
  storageBucket: "eternal-s-events.appspot.com",
  messagingSenderId: "401382554098",
  appId: "1:401382554098:web:a9f4928aa3e0b92f0cd36b",
  measurementId: "G-0PK5R6EYNY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
