import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useCartProducts } from '../../contexts/CartContext'; // Import the cart context

const CartIcon = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { cartProducts } = useCartProducts(); // Get cartProducts from context

  // Calculate total count of items in the cart
  const cartCount = cartProducts.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of items in the cart
  const cartTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCartClick = () => {
    navigate('/cart-item'); // Navigate to the Order Summary page
  };

  return (
    <div className="relative">
      {/* Cart icon with badge */}
      <IconButton className="text-black" onClick={handleCartClick}>
        <Badge
          badgeContent={cartCount || 0} // Use 0 if cartCount is 0
          classes={{ badge: 'bg-black text-white' }}
        >
          <CiShoppingCart size={30} />
        </Badge>
      </IconButton>

      {/* Small rounded box below the icon for the total amount */}
      <div className="absolute mt-[-10px] right-[-8px] bg-black text-white text-[10px] font-bold px-2 rounded-full">
      ₵{cartTotal}
      </div>
    </div>
  );
};

export default CartIcon;
