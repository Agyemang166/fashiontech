import React, { createContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore"; // Import onSnapshot for real-time updates
import { db } from '../services/firebaseConfig';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]); // State to hold product list
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        liked: false, // Initialize liked property
      }));
      setProductList(productsData); // Set the fetched products to state
      setLoading(false); // Set loading to false once data is fetched
    }, (error) => {
      console.error("Error fetching products: ", error);
      setLoading(false); // Set loading to false on error
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <ProductContext.Provider value={{ productList, loading }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return React.useContext(ProductContext);
};
