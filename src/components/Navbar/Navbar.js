import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa'; // Importing react-icons
import Logo from './Logo';
import { CiSearch } from "react-icons/ci";
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';
import HeartIcon from './HeartIcon';
import DrawerContent from './DrawerContent';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center p-4">
        {/* Left: Drawer toggle button */}
        <button onClick={toggleDrawer} className="text-black">
          <FaBars size={24} />
        </button>

        {/* Center: Logo */}
        {!searchOpen && <Logo />}

        {/* Right: Icons */}
        <div className="flex items-center gap-0">
          {!searchOpen ? (
            <>
              <button onClick={toggleSearch} className="text-black">
                <CiSearch size={24} />
              </button>
              <HeartIcon />
              <CartIcon />
            </>
          ) : (
            <SearchBar closeSearch={toggleSearch} />
          )}
        </div>
      </div>

      {/* Drawer for mobile menu */}
      {drawerOpen && <DrawerContent closeDrawer={toggleDrawer} isOpen={drawerOpen} />}
    </nav>
  );
};

export default Navbar;
