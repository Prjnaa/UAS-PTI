import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDjVlEumpyuMWM846LHKh7W5UeerInDlc",
  authDomain: "uas-pti-8f2c8.firebaseapp.com",
  projectId: "uas-pti-8f2c8",
  databaseURL:
    "https://uas-pti-8f2c8-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "uas-pti-8f2c8.appspot.com",
  messagingSenderId: "569867826029",
  appId: "1:569867826029:web:abb1f73ecd54c9ade12064",
  measurementId: "G-LHE1JYNDSP",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
