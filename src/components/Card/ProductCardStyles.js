const styles = {
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    padding: '8px', // Reduced padding
    width: '192px',
    textAlign: 'left',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '300px', // Adjusted height for a more compact look
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '180px', // Reduced height
    overflow: 'hidden',
    borderRadius: '8px',
  },
  image: {
    width: '100%',
    height: '100%', // Adjusted to fully cover the container
    objectFit: 'cover',
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
    fontSize: '14px', 
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
    color: 'black',
    fontSize: '12px',
  },
  discountedPrice: {
    color: '#333',
    fontSize: '16px', 
    fontWeight: 'bold',
  },
  discountLabel: {
    color: '#ab0000',
    fontSize: '11px',
    marginLeft: '5px',
    marginTop: '4px',
    fontWeight:'bold'
  },
  discount: {
    display: 'flex',
  },
  price: {
    fontSize: '16px', 
    fontWeight: 'bold',
    color: '#333',
  },
  addButtonContainer: {
    marginTop: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
    width: '100%',
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
    width: '100%',
  },
  cartIcon: {
    marginRight: '5px',
  },
};

export default styles;
