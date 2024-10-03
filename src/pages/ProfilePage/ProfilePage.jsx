import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/userContext'; // Adjust the path as needed
import SignUp from '../../Auth/SignUp'; // Import the SignUp component
import LogoutButton from "./LogoutButton";
import { Box, Typography, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle, ShoppingCart, Payment, ArrowForwardIos, FavoriteBorder } from '@mui/icons-material';

const ProfilePage = () => {
  const { currentUser, loading } = useCurrentUser();
  const navigate = useNavigate();

  // If the authentication state is still loading, display a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user is logged in, redirect to the signup page
  if (!currentUser) {
    return <SignUp />;
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      {/* Profile Header */}
      <Box sx={{ backgroundColor: '#ffffff', padding: 3, borderRadius: 2, textAlign: 'center', marginBottom: 3 }}>
        <AccountCircle sx={{ fontSize: 60, color: '#0073e6' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 1 }}>
          {currentUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {currentUser.email}
        </Typography>
      </Box>

      {/* Profile Options */}
      <Box sx={{ backgroundColor: '#ffffff', borderRadius: 2, padding: 2 }}>
        <List>
          {/* Orders */}
          <ListItem button onClick={() => navigate('/order')}>
            <ListItemIcon>
              <ShoppingCart sx={{ color: '#0073e6' }} />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            <ArrowForwardIos sx={{ color: '#0073e6' }} />
          </ListItem>
          <Divider />

          {/* Payment Options */}
          <ListItem button onClick={() => navigate('/payment-options')}>
            <ListItemIcon>
              <Payment sx={{ color: '#0073e6' }} />
            </ListItemIcon>
            <ListItemText primary="Payment & Return Policy" />
            <ArrowForwardIos sx={{ color: '#0073e6' }} />
          </ListItem>
          <Divider />

          {/* Wishlist */}
          <ListItem button onClick={() => navigate('/wishlist')}>
            <ListItemIcon>
              <FavoriteBorder sx={{ color: '#0073e6' }} />
            </ListItemIcon>
            <ListItemText primary="Wishlist" />
            <ArrowForwardIos sx={{ color: '#0073e6' }} />
          </ListItem>
          <Divider />

          {/* Shop Now */}
          <ListItem button onClick={() => navigate('/')}>
            <ListItemIcon>
              <ShoppingCart sx={{ color: '#0073e6' }} />
            </ListItemIcon>
            <ListItemText primary="Shop Now" />
            <ArrowForwardIos sx={{ color: '#0073e6' }} />
          </ListItem>
        </List>
      </Box>

      {/* Logout Button */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <LogoutButton />
      </Box>
    </Box>
  );
};

export default ProfilePage;
