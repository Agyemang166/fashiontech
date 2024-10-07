// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth  } from "firebase/auth"; // Import Auth

const firebaseConfig = {
apiKey: "AIzaSyBUGgzd4a-2ykxwSUUibiq6H-_lV5w_ryE",
  authDomain: "mallzonixshop.firebaseapp.com",
  projectId: "mallzonixshop",
  storageBucket: "mallzonixshop.appspot.com",
  messagingSenderId: "909786373968",
  appId: "1:909786373968:web:fb68b0d7f2dccfe0e49655",
  measurementId: "G-EXQ4YC2TG0"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

export { app, db, auth };
