import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useCurrentUser } from './userContext'; // Import the user context to get the current user

const FavoriteProductsContext = createContext();

export const useFavoriteProducts = () => {
  return useContext(FavoriteProductsContext);
};

export const FavoriteProductsProvider = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const favoritesRef = collection(db, 'users', currentUser.id, 'favorites'); // Adjust path as needed
  
      // Listen for changes in the user's favorite products
      const unsubscribe = onSnapshot(favoritesRef, (snapshot) => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoriteProducts(products); // Update the state with the latest favorite products
        setLoading(false);
      });
  
      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setFavoriteProducts([]);
      setLoading(false);
    }
  }, [currentUser]);
  

  return (
    <FavoriteProductsContext.Provider value={{ favoriteProducts, loading }}>
      {children}
    </FavoriteProductsContext.Provider>
  );
};
