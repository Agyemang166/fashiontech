import React, { useEffect } from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';
import { FaChevronRight, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import { useCurrentUser } from "../../contexts/userContext";
import menuItems from './MenuItems';

const DrawerContent = ({ closeDrawer, isOpen }) => {


  const { currentUser } = useCurrentUser(); // Fetch current user from context

  // Close the drawer when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && event.target.closest('.drawer-content') === null) {
        closeDrawer();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeDrawer]);

  return (
    <div className={`fixed left-0 top-0 h-full w-[350px] bg-white shadow-lg p-4 drawer-content transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out overflow-y-auto`}>
      {/* Close Icon */}
      <div className="flex justify-between items-center mb-4 mt-3">
        <h2 className="text-2xl font-bold text-black">MALLZONIX</h2>
        <FaTimes 
          onClick={() => setTimeout(closeDrawer, 300)} 
          className="cursor-pointer text-black transition-transform duration-300 ease-in-out" 
          size={24} 
        />
      </div>

      {/* My Account Section */}
      <Link to="/profile" className="flex items-center space-x-3 mb-4" onClick={closeDrawer}>
        {currentUser ? (
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-300">
            <span className="text-lg font-medium text-gray-800">
              {currentUser.firstName ? currentUser.firstName.charAt(0).toUpperCase() : currentUser.email.charAt(0).toUpperCase()}
            </span>
          </div>
        ) : (
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <span className="text-lg font-medium text-gray-800">My Account</span>
      </Link>

      <Divider className="mt-2 mb-4" />

      {/* Navigation Menu */}
      <List>
        {menuItems.map((item, index) => (
          <Link 
            to={item.route} 
            key={index} 
            onClick={closeDrawer} 
            className="no-underline text-black"
          >
            <ListItem button className="flex items-center space-x-3">
              {/* Circular Image */}
              <img src={item.icon} alt={item.name} className="w-[40px] h-[40px] rounded-full object-cover" />
              
              {/* Menu Item Text */}
              <ListItemText primary={item.name} className="text-lg text-gray-700" />
              
              {/* Right Arrow */}
              <FaChevronRight className="text-gray-500" />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider className="my-4" />
    </div>
  );
};

export default DrawerContent;
