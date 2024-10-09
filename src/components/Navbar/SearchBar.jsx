import React, { useState, useEffect } from 'react';
import { TextField, IconButton, Drawer, Box, List, ListItem, Typography, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useProducts } from '../../contexts/ProductContext'; // Import your ProductContext
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import searchGif from '../../Assets/search.gif'; // Placeholder for when search is empty
import noResultsGif from '../../Assets/Empty.gif'; // Placeholder for when no results are found

const SearchBar = ({ closeSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(true); // Automatically open drawer when search is clicked

  // Get productList and loading from ProductContext
  const { productList, loading } = useProducts();

  // Search function that filters products based on the search term and sorts them alphabetically
  useEffect(() => {
    if (!loading) {
      if (searchTerm) {
        const filteredResults = productList
          .filter(product => {
            const term = searchTerm.toLowerCase();
            return product.productName.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
          })
          .sort((a, b) => a.productName.localeCompare(b.productName)); // Sort alphabetically by product name
          
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
          sx: { height: '100vh', backgroundColor: '#fff' }, // Full-page drawer
        }}
      >
        {/* Search Bar with Close Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for Mallzonix products..."
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
          {searchTerm === '' ? (
            // Show search GIF when the search bar is empty
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '60vh' }}>
            Search for any product on Molzonix.
              <img src={searchGif} alt="Search for products" style={{ maxWidth: '250px', marginBottom: '16px' }} />
              <Typography variant="body1">
              </Typography>
            </Box>
          ) : (
            <>
            <p>Search Results for {searchTerm}</p>
              {searchResults.length > 0 ? (
                <List>
                  {searchResults.map((result, index) => (
                    <React.Fragment key={result.id}>
                      <ListItem sx={{ padding: 1 }}>
                        <Link 
                          to={`/products/${result.id}`} 
                          style={{ textDecoration: 'none', color: 'inherit', width: '100%' }} 
                          onClick={handleClose}
                          aria-label={`View details for ${result.productName}`} // Accessibility for link
                        >
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {result.productName}
                          </Typography>
                        </Link>
                      </ListItem>
                      {index < searchResults.length - 1 && <Divider sx={{ my: 2 }} />} {/* Line between items */}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                // Show no-results GIF when there are no search results
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '60vh' }}>
                  <img src={noResultsGif} alt="No results found" style={{ maxWidth: '250px', marginBottom: '16px' }} />
                  <Typography variant="body1">
                    Your search doesn't match any products. Try searching for another item.
                  </Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SearchBar;
