import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'; 
import { useFavoriteProducts } from '../../contexts/FavoriteContext'; 

const HeartIcon = () => {
  const { favoriteProducts } = useFavoriteProducts(); // Access the favorite products from the context
  const favoriteCount = favoriteProducts.length; // Get the count of favorite products
  const navigate = useNavigate(); 

  const handleIconClick = () => {
    navigate('/favorite-collection'); // Navigate to the favorites page
  };

  return (
    <IconButton className="text-white" onClick={handleIconClick}> 
      <Badge badgeContent={favoriteCount} color="bg-black" classes={{ badge: 'bg-black-500 text-black' }}>
        <CiHeart />
      </Badge>
    </IconButton>
  );
};

export default HeartIcon;
