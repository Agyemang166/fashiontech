// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth,GoogleAuthProvider  } from "firebase/auth"; // Import Auth

const firebaseConfig = {
  apiKey: "AIzaSyBGm5RlK9GlY4NyXqfJ_Lfimvz2rJVQhlc",
  authDomain: "technestmall.firebaseapp.com",
  projectId: "technestmall",
  storageBucket: "technestmall.appspot.com",
  messagingSenderId: "6665216046",
  appId: "1:6665216046:web:fc8c4a4e34956c26a9bfbf",
  measurementId: "G-V342JVG99M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Auth

export { app, db, auth };
