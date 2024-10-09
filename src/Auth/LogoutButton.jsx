import React from 'react';
import { Button } from '@mui/material';
import { auth } from '../services/firebaseConfig'; // Adjust the path as needed
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const LogoutButton = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const onLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      try {
        await signOut(auth);
        console.log("User signed out successfully");
        navigate('/'); 
      } catch (error) {
        console.error("Error signing out:", error);
      }
    }
  };

  return (
    <Button 
      variant="contained" 
      color="error" 
      onClick={onLogout} 
      style={{ marginTop: '20px' }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
