import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Drawer, Box, List, ListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../../contexts/ProductContext'; // Import your ProductContext
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const SearchBar = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true); // Automatically open drawer when search is clicked

  // Get productList and loading from ProductContext
  const { productList, loading } = useProducts();

  // Search function that filters products based on the search term
  useEffect(() => {
    if (!loading) {
      if (searchTerm) {
        const filteredResults = productList.filter(product => {
          const term = searchTerm.toLowerCase();
          return (
            product.productName.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term) // Check description
          );
        });
        setSearchResults(filteredResults);
      } else {
        setSearchResults([]); // Clear results when search term is empty
      }
    }
  }, [searchTerm, productList, loading]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term
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
            aria-label="Search products"
          />
          {/* Close Button next to Search Input */}
          <IconButton onClick={handleClose} sx={{ marginLeft: 1 }} aria-label="Close search drawer">
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
              searchResults.map((result) => (
                <ListItem key={result.id} sx={{ padding: 1 }}>
                  <Link 
                    to={`/products/${result.id}`} 
                    style={{ textDecoration: 'none', color: 'inherit' }} 
                    onClick={handleClose}
                    aria-label={`View details for ${result.productName}`} // Accessibility for link
                  >
                    {result.productName} 
                  </Link>
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
