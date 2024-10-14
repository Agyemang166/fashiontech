import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, enableIndexedDbPersistence } from "firebase/firestore";
import { db } from '../services/firebaseConfig';

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.error("Offline persistence can only be enabled in one tab at a time.");
  } else if (err.code === 'unimplemented') {
    console.error("Offline persistence is not supported in this browser.");
  }
});

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const CACHE_EXPIRATION_TIME = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
  const [productList, setProductList] = useState(() => {
    // Try to get the cached products from localStorage
    const cachedProducts = localStorage.getItem('productList');
    const cachedTimestamp = localStorage.getItem('cachedTimestamp');
    const isCacheExpired = cachedTimestamp && (Date.now() - cachedTimestamp) > CACHE_EXPIRATION_TIME;

    // Return cached products if available and not expired, else an empty array
    return cachedProducts && !isCacheExpired ? JSON.parse(cachedProducts) : [];
  });
  const [loading, setLoading] = useState(true);

  // Function to shuffle the product array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Function to fetch products from Firestore on-demand
  const fetchProductsFromFirestore = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const snapshot = await getDocs(productsCollection);
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        liked: false,
      }));

      const shuffledProducts = shuffleArray(productsData);
      setProductList(shuffledProducts);
      setLoading(false);

      // Cache the products and set a timestamp for expiration
      localStorage.setItem('productList', JSON.stringify(shuffledProducts));
      localStorage.setItem('cachedTimestamp', Date.now());
    } catch (error) {
      console.error("Error fetching products: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if we have valid cached products
    const cachedProducts = localStorage.getItem('productList');
    const cachedTimestamp = localStorage.getItem('cachedTimestamp');
    const isCacheExpired = cachedTimestamp && (Date.now() - cachedTimestamp) > CACHE_EXPIRATION_TIME;

    if (cachedProducts && !isCacheExpired) {
      setLoading(false); // If cache is valid, use it
    } else {
      // If cache is expired or missing, fetch from Firestore
      fetchProductsFromFirestore();
    }
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <ProductContext.Provider value={{ productList, loading, fetchProductsFromFirestore }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return React.useContext(ProductContext);
};
