// googleAuth.js
import { auth, db } from '../services/firebaseConfig'; // Adjust path as needed
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const handleGoogleSignUp = async (navigate) => {
  const googleProvider = new GoogleAuthProvider();

  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    // Save the user data to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
    });

    // Show welcome prompt and redirect
    const welcomeMessage = window.confirm(`Welcome to TECHNEST, ${user.displayName}! Click OK to continue.`);
    
    if (welcomeMessage) {
      navigate('/'); // Redirect to home page
    }

    console.log("User signed up with Google:", user.email);
  } catch (error) {
    console.error("Error signing up with Google:", error);
  }
};
