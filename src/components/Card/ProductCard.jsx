import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../services/firebaseConfig';
import { useCurrentUser } from '../../contexts/userContext';
import styles from './ProductCardStyles'; 
import { doc, getDoc } from 'firebase/firestore';
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 
import {
  subscribeToFavorites,
  subscribeToProduct,
  addToCart,
  removeFromCart,
  toggleFavorite,
} from './ProductCardFunctions'; // Import functions
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(product.discount > 0 ? product.discountedPrice : product.price);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();
  const userId = currentUser ? currentUser.id : null;

  useEffect(() => {
    const unsubscribeFromFavorites = userId ? subscribeToFavorites(db, userId, product.id, setIsFavorite) : null;
    const unsubscribeFromProduct = subscribeToProduct(db, product.id, setCurrentPrice);

    return () => {
      if (unsubscribeFromFavorites) unsubscribeFromFavorites();
      unsubscribeFromProduct();
    };
  }, [userId, product.id]);

  useEffect(() => {
    const checkIfInCart = async () => {
      if (userId) {
        const cartItemRef = doc(db, 'users', userId, 'cart', product.id);
        const docSnap = await getDoc(cartItemRef);
        setIsInCart(docSnap.exists());
      }
    };

    checkIfInCart();
  }, [userId, product.id]);

  const handleAddToCart = () => addToCart(db, userId, product, currentPrice, navigate, setIsInCart, 1);
  const handleRemoveFromCart = () => removeFromCart(db, userId, product, navigate, setIsInCart);
  const handleFavoriteClick = () => toggleFavorite(db, userId, product, isFavorite, setIsFavorite);

  const formatPrice = (price) => {
    const [whole, decimal] = price.toFixed(2).split('.');
    return (
      <>
        <span style={styles.priceCurrency}>₵ </span>
        <span style={styles.priceWhole}>{whole}</span>
        <span style={styles.priceDecimal}>.{decimal}</span>
      </>
    );
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Link to={`/products/${product.id}`}>
          <img src={product.images[0]} alt={product.productName} style={styles.image} />
        </Link>
        <button onClick={handleFavoriteClick} style={styles.heartButton}>
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
          <button style={styles.addButton} onClick={handleAddToCart}>Add to Cart</button>
        ) : (
          <button style={styles.viewCartButton} onClick={handleRemoveFromCart}>
            Remove from Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
