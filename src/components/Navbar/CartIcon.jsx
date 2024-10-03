import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const cartCount = 3;  // Replace with dynamic value
  const cartTotal = 250.00; // Replace with dynamic value

  const handleCartClick = () => {
    navigate('/cart-item'); // Navigate to the Order Summary page
  };

  return (
    <div className="relative">
      {/* Cart icon with badge */}
      <IconButton className="text-black" onClick={handleCartClick}>
        <Badge
          badgeContent={cartCount}
          classes={{ badge: 'bg-black text-white' }}
        >
          <CiShoppingCart size={24} />
        </Badge>
      </IconButton>

      {/* Small rounded box below the icon for the total amount */}
      <div className="absolute mt-[-10px] right-0 bg-black text-white text-[10px] font-bold px-2 rounded-full">
        ${cartTotal}
      </div>
    </div>
  );
};

export default CartIcon;
