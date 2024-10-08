import React from 'react';
import styles from './ProductCardStyles'; // Use the same styles

const PlaceholderProductCard = () => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <div style={{ 
          width: '100%', 
          height: '100%', 
          backgroundColor: '#e0e0e0', 
          borderRadius: '8px' 
        }}></div>
      </div>
      <div style={{ padding: '10px' }}>
        <div style={{
          width: '100%', 
          height: '20px', 
          backgroundColor: '#e0e0e0', 
          margin: '10px 0'
        }}></div>
        <div style={{
          width: '80%', 
          height: '15px', 
          backgroundColor: '#e0e0e0', 
          margin: '5px 0'
        }}></div>
        <div style={{
          width: '50%', 
          height: '15px', 
          backgroundColor: '#e0e0e0', 
          margin: '5px 0'
        }}></div>
      </div>
      <div style={styles.addButtonContainer}>
        <button style={{ 
          ...styles.addButton, 
          backgroundColor: '#ccc', 
          cursor: 'not-allowed' 
        }} disabled>
          Loading...
        </button>
      </div>
    </div>
  );
};

export default PlaceholderProductCard;
