// src/components/ProductCardFunctions.js

import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

// Subscribe to user's favorites
export const subscribeToFavorites = (db, userId, productId, setIsFavorite) => {
  const favoriteRef = doc(db, 'users', userId, 'favorites', productId);
  return onSnapshot(favoriteRef, (doc) => {
    setIsFavorite(doc.exists());
  });
};

// Subscribe to product updates
export const subscribeToProduct = (db, productId, setCurrentPrice) => {
  const productRef = doc(db, 'products', productId);
  return onSnapshot(productRef, (doc) => {
    if (doc.exists()) {
      const data = doc.data();
      setCurrentPrice(data.discount > 0 ? data.discountedPrice : data.price);
    }
  });
};

// Add item to cart
export const addToCart = async (db, userId, product, currentPrice, navigate, setIsInCart, quantity) => {
  if (!userId) {
    navigate('/sign-in');
    return;
  }

  try {
    const cartItemRef = doc(db, 'users', userId, 'cart', product.id);
    await setDoc(cartItemRef, {
      name: product.productName,
      image: product.images[0],
      quantity: quantity, // Set the quantity from the parameter
      price: currentPrice,
    });
    setIsInCart(true);
    toast.success(`${product.productName} has been successfully added to your cart!`);
  } catch (error) {
    console.error("Error adding to cart: ", error);
  }
};

// Update cart item quantity
export const updateCartItemQuantity = async (db, userId, productId, quantity) => {
  try {
    const cartItemRef = doc(db, 'users', userId, 'cart', productId);
    await setDoc(cartItemRef, { quantity: quantity }, { merge: true });
  } catch (error) {
    console.error("Error updating cart item quantity: ", error);
  }
};

// Remove item from cart without resetting quantity
// Completely remove the item from cart
export const removeFromCart = async (db, userId, product, navigate, setIsInCart) => {
  if (!userId) {
    navigate('/sign-in');
    return;
  }

  try {
    const cartItemRef = doc(db, 'users', userId, 'cart', product.id);
    const cartItemSnapshot = await getDoc(cartItemRef);

    if (cartItemSnapshot.exists()) {
      // Completely remove the document from Firestore
      await deleteDoc(cartItemRef);
    }
    
    setIsInCart(false); // Update the state to reflect that the item is no longer in the cart
    toast.info(`${product.productName} has been removed from your cart.`);
  } catch (error) {
    console.error("Error removing from cart: ", error);
  }
};


// Toggle favorite status
export const toggleFavorite = async (db, userId, product, isFavorite, navigate, setIsFavorite) => {
  if (!userId) {
    navigate('/sign-in');
    return;
  }

  try {
    const favoriteItemRef = doc(db, 'users', userId, 'favorites', product.id);
    
    if (isFavorite) {
      // Remove the product from favorites
      await deleteDoc(favoriteItemRef);
      toast.info(`${product.productName} has been removed from your favorites.`);
    } else {
      // Add the entire product to favorites
      await setDoc(favoriteItemRef, {
        // Copy all relevant product properties to the favorites
        id: product.id,
        name: product.productName,
        images: product.images,
        price: product.price,
        description: product.description, // Include additional properties as needed
        category: product.category, // Example additional property
        // Add any other properties that are part of the product object
      });
      toast.success(`${product.productName} has been added to your favorites!`);
    }
    
    // Toggle favorite state
    setIsFavorite(!isFavorite);
  } catch (error) {
    console.error("Error toggling favorite: ", error);
  }
};

// Subscribe to cart item changes
export const subscribeToCartItem = (db, userId, productId, setIsInCart) => {
  const cartItemRef = doc(db, 'users', userId, 'cart', productId);
  return onSnapshot(cartItemRef, (doc) => {
    setIsInCart(doc.exists() && doc.data().quantity > 0); // Ensure item is in cart and has quantity
  });
};

// Fetch cart item quantity
export const fetchCartItemQuantity = async (db, userId, productId, setQuantity) => {
  const cartItemRef = doc(db, "users", userId, "cart", productId);
  const cartItemSnapshot = await getDoc(cartItemRef);

  if (cartItemSnapshot.exists()) {
    const data = cartItemSnapshot.data();
    setQuantity(data.quantity || 1); // Default to 1 if quantity is not defined
  } else {
    setQuantity(1); // Default to 1 if the item is not found in the cart
  }
};
