import React, { createContext, useState, useEffect, useContext } from 'react';
import { doc, getDoc } from 'firebase/firestore'; 
import { onAuthStateChanged } from 'firebase/auth'; 
import { db, auth } from '../services/firebaseConfig'; 

// Create a context for CurrentUser
const CurrentUserContext = createContext();

// Create a provider component for current user
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid); // Get the document for the current user by their UID
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setCurrentUser({
              id: user.uid,
              ...userDoc.data(),
            });
          } else {
            console.error('No such user found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError(error);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, loading, error }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// Custom hook to use the CurrentUser context
export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};
