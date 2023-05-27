import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDDjVlEumpyuMWM846LHKh7W5UeerInDlc",
  authDomain: "uas-pti-8f2c8.firebaseapp.com",
  databaseURL: "https://uas-pti-8f2c8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "uas-pti-8f2c8",
  storageBucket: "uas-pti-8f2c8.appspot.com",
  messagingSenderId: "569867826029",
  appId: "1:569867826029:web:abb1f73ecd54c9ade12064",
  measurementId: "G-LHE1JYNDSP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvide = new GoogleAuthProvider();

export const db = getFirestore(app);
