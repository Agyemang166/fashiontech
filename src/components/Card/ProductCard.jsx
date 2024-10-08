import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { useCurrentUser } from '../../contexts/userContext';
import styles from './ProductCardStyles'; 
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import {
  subscribeToFavorites,
  subscribeToProduct,
  addToCart,
  removeFromCart,
  toggleFavorite,
} from './ProductCardFunctions';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.discount > 0 ? product.discountedPrice : product.price);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const userId = currentUser ? currentUser.id : null;

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const unsubscribeFromFavorites = userId ? subscribeToFavorites(db, userId, product.id, setIsFavorite) : null;
    const unsubscribeFromProduct = subscribeToProduct(db, product.id, setCurrentPrice);

    const fetchCartItems = async () => {
      if (userId) {
        const cartRef = collection(db, 'users', userId, 'cart');
        const cartSnap = await getDocs(cartRef);
        const cartItemsData = cartSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCartItems(cartItemsData);
        setIsInCart(cartItemsData.some(item => item.id === product.id));
      }
    };

    fetchCartItems();

    return () => {
      if (unsubscribeFromFavorites) unsubscribeFromFavorites();
      unsubscribeFromProduct();
    };
  }, [userId, product.id]);

  const handleAddToCart = async () => {
    setLoading(true);
    await addToCart(db, userId, product, currentPrice, navigate, setIsInCart, 1);
    setLoading(false);
  };

  const handleRemoveFromCart = async () => {
    setLoading(true);
    await removeFromCart(db, userId, product, navigate, setIsInCart);
    setLoading(false);
  };

  const handleFavoriteClick = () => toggleFavorite(db, userId, product, isFavorite, setIsFavorite);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHC',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Link to={`/products/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={`Shop ${product.productName} at MALLZONIC - Your go-to place for apparel, cosmetics, drinks, electronics, and more`} 
            style={styles.image} 
          />
        </Link>
        <button 
          onClick={handleFavoriteClick} 
          style={styles.heartButton} 
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? <FaHeart style={styles.heartIcon} color="red" /> : <FaRegHeart style={styles.heartIcon} />}
        </button>
      </div>
      <Link to={`/products/${product.id}`}>
        <div>
          <h3 style={styles.name}>{product.productName}</h3>
          <div style={styles.priceContainer}>
            {product.discount > 0 && (
              <>
                <span style={styles.originalPrice}>{formatPrice(product.price)}</span>
                <div style={styles.discount}>
                  <span style={styles.discountedPrice}>{formatPrice(currentPrice)}</span>
                  <span style={styles.discountLabel}>{`${product.discount}% off`}</span>      
                </div>
              </>
            )}
            {product.discount <= 0 && (
              <span style={styles.price}>{formatPrice(currentPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <div style={styles.addButtonContainer}>
        {!isInCart ? (
          loading ? (
            <button style={styles.addButton} disabled aria-label="Adding item to cart">
              Adding...
            </button>
          ) : (
            <button 
              style={styles.addButton} 
              onClick={handleAddToCart} 
              aria-label="Add to cart"
            >
              Add to Cart
            </button>
          )
        ) : (
          loading ? (
            <button style={styles.viewCartButton} disabled aria-label="Removing item from cart">
              Removing...
            </button>
          ) : (
            <button 
              style={styles.viewCartButton} 
              onClick={handleRemoveFromCart} 
              aria-label="Remove from cart"
            >
              Remove from Cart
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCard;
