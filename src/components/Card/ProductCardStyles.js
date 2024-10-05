// src/components/ProductCardStyles.js

const styles = {
    card: {
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
      padding: '10px',
      width: '200px',
      textAlign: 'left',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
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
      padding: '12px',
      cursor: 'pointer',
    },
    heartIcon: {
      fontSize: '24px',
    },
    name: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#333',
      margin: '10px 0 5px',
    },
    priceContainer: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'left',
    },
    originalPrice: {
      textDecoration: 'line-through',
      color: '#999',
      fontSize: '12px',
    },
    discountedPrice: {
      color: '#333',
      fontSize: '18px',
      fontWeight: 'bold',
    },
    discountLabel: {
      color: '#d9534f',
      fontSize: '12px',
      marginLeft: '5px',
      marginTop:'4px'
    },
    discount:{
display:'flex'
    },
    price: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
    },
addButtonContainer: {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center', // Center-aligns the button
  width: '100%',
},

addButton: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',  // Full width
},
viewCartButton: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 16px',
  backgroundColor: '#ab0000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  width: '100%',  // Full width
},

    cartIcon: {
      marginRight: '5px',
    },
  };
  
  export default styles;
  