import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useCartProducts } from '../../contexts/CartContext';

const CartIcon = () => {
  const navigate = useNavigate();
  const { cartProducts } = useCartProducts();
  const cartCount = cartProducts.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartProducts.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCartClick = () => {
    navigate('/cart-item');
  };

  return (
    <div className="relative">
      <IconButton className="text-black" onClick={handleCartClick} aria-label="View cart items">
        <Badge
          badgeContent={cartCount || 0}
          classes={{ badge: 'bg-black text-white' }}
        >
          <CiShoppingCart size={30} />
        </Badge>
      </IconButton>
      <div className="absolute mt-[-10px] right-[-8px] bg-black text-white text-[10px] font-bold px-2 rounded-full">
        ₵{cartTotal}
      </div>
    </div>
  );
};

export default CartIcon;
