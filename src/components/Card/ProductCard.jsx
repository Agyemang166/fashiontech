import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // assuming you are using react-router for navigation
import { FaShoppingCart } from 'react-icons/fa'; // To add cart icon

const ProductCard = ({ product, addToCart, toggleFavorite, isFavorited }) => {
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleFavoriteClick = () => {
    toggleFavorite(product.id);
    setIsFavorite(!isFavorite);
  };

  const formatPrice = (price) => {
    const [whole, decimal] = price.toFixed(2).split('.');
    return (
      <>
        <span style={styles.priceCurrency}>$</span>
        <span style={styles.priceWhole}>{whole}</span>
        <span style={styles.priceDecimal}>.{decimal}</span>
      </>
    );
  };

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <Link to={`/product/${product.id}`} style={styles.link}>
          <img
            src={product.images[0]}
            alt={product.name} // Provide descriptive alt text for SEO
            style={styles.image}
            loading="lazy" // Enable lazy loading for performance
          />
        </Link>
        
        <button 
          style={styles.heartButton} 
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'} 
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'} 
          aria-pressed={isFavorite} 
        >
          <span style={styles.heartIcon}>{isFavorite ? '❤️' : '🤍'}</span>
        </button>
      </div>

      <Link to={`/product/${product.id}`} style={styles.link}>
        <h3 style={styles.name}>{product.name}</h3>
      </Link>
      <Link to={`/product/${product.id}`} style={styles.link}>
        <p style={styles.price}>{formatPrice(product.price)}</p>
      </Link>
      <button 
        onClick={() => addToCart(product)} 
        style={styles.addButton}
        aria-label={`Add ${product.name} to bag`} 
      >
        <FaShoppingCart style={styles.cartIcon} /> Add to Bag
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    padding: '10px',
    width: '200px',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: '#d3d3d3',
    borderRadius: '8px',
  },
  image: {
    width: '100%',
    borderRadius: '5px',
  },
  heartButton: {
    position: 'absolute',
    top: '10px',
    right: '0',
    backgroundColor: 'transparent',
    border: 'none',
    padding: '12px', // Increased touch space for accessibility
    cursor: 'pointer',
  },
  heartIcon: {
    fontSize: '18px',
  },
  name: {
    fontSize: '16px',
    fontWeight: 'bold', // Bold
    color: '#333',
    margin: '10px 0 5px',
    textAlign: 'left', // Aligned to the left
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    textAlign: 'left', // Align price text to the left
  },
  priceCurrency: {
    fontSize: '12px', // Smaller money sign
    color: '#777',
  },
  priceWhole: {
    fontSize: '18px', // Larger digits
    fontWeight: 'bold',
    color: '#333',
  },
  priceDecimal: {
    fontSize: '12px', // Smaller decimal
    color: '#777',
  },
  addButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 16px',
    backgroundColor: '#000', // Black background for Add to Bag button
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    width: "100%"
  },
  cartIcon: {
    marginRight: '8px', // Space between icon and text
  },
  link: {
    textDecoration: 'none',
  },
};

export default ProductCard;
