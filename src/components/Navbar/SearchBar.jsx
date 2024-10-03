import React, { useState } from 'react';
import { TextField, IconButton, Drawer, Box, List, ListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SearchBar = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true); // Automatically open drawer when search is clicked

  // Simulate search when typing (you can replace this with API call)
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    // Perform search logic here, for now just a dummy list
    setSearchResults(['Product 1', 'Product 2', 'Product 3', 'Product 4']);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    closeSearch(); // Close the search drawer and switch back to the icon in the navbar
  };

  return (
    <>
      {/* Drawer for Full Page Search */}
      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { height: '100vh', backgroundColor: '#f9f9f9' }, // Full-page drawer
        }}
      >
        {/* Search Bar with Close Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for techest products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {/* Close Button next to Search Input */}
          <IconButton onClick={handleClose} sx={{ marginLeft: 1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Search Results */}
        <Box sx={{ padding: 3 }}>
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Search Results for "{searchTerm}"
          </Typography>
          <List>
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <ListItem key={index} sx={{ padding: 1 }}>
                  {result}
                </ListItem>
              ))
            ) : (
              <Typography>No results found</Typography>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default SearchBar;
