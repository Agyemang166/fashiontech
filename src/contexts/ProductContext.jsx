// ProductContext.js
import React, { createContext, useState, useEffect } from 'react';
import products from '../Assets/data'; 

// Create Product Context
const ProductContext = createContext();

// Create a provider component
export const ProductProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Initialize products with a liked property
    const initializedProducts = products.map(product => ({
      ...product,
      liked: false, // New liked property
    }));
    setProductList(initializedProducts);
  }, []);

  // Function to add a product to the cart
  const addToCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const productToAdd = productList.find((product) => product.id === productId);
        return [
          ...prevCart,
          { ...productToAdd, quantity: 1 },
        ];
      }
    });
  };

  // Function to increment product quantity
  const incrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrement product quantity
  const decrementQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(item.quantity - 1, 0) } // Prevent negative quantities
          : item
      )
    );
  };

  // Function to toggle like status of a product
  const toggleLike = (productId) => {
    setProductList((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, liked: !product.liked } : product
      )
    );
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <ProductContext.Provider value={{ productList, cart, addToCart, incrementQuantity, decrementQuantity, toggleLike, totalPrice }}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook to use the Product Context
export const useProducts = () => {
  return React.useContext(ProductContext);
};
