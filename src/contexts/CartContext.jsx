import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebaseConfig'; // Adjust the import path as needed
import { collection, onSnapshot } from 'firebase/firestore';
import { useCurrentUser } from './userContext'; // Import the user context to get the current user

const CartProductsContext = createContext();

export const useCartProducts = () => {
  return useContext(CartProductsContext);
};

export const CartProductsProvider = ({ children }) => {
  const { currentUser } = useCurrentUser();
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const cartRef = collection(db, 'users', currentUser.id, 'cart'); // Reference to the user's cart collection

      // Listen for changes in the user's cart products
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const products = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCartProducts(products); // Update the state with the latest cart products
        setLoading(false);
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    } else {
      setCartProducts([]);
      setLoading(false);
    }
  }, [currentUser]);

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartProductsContext.Provider value={{ cartProducts,clearCart, loading }}>
      {children}
    </CartProductsContext.Provider>
  );
};
