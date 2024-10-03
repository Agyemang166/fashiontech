import React from 'react';
import { Badge, IconButton } from '@mui/material';
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom'; 

const HeartIcon = () => {
  const favoriteCount = 5; 
  const navigate = useNavigate(); 

  const handleIconClick = () => {
    navigate('/favorite-collection'); 
  };

  return (
    <IconButton className="text-white" onClick={handleIconClick}> {/* Add onClick event */}
      <Badge badgeContent={favoriteCount} color="bg-black" classes={{ badge: 'bg-black-500 text-black' }}>
        <CiHeart />
      </Badge>
    </IconButton>
  );
};

export default HeartIcon;
