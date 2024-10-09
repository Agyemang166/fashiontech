import React from 'react';
import { useProducts } from '../contexts/ProductContext'; // Adjust this path as needed
import ProductCard from '../components/Card/ProductCard'; // Your existing ProductCard component
import CircularMenuGrid from '../components/Navbar/CircularMenuGrid';
import PlaceholderProductCard from '../components/Card/PlaceholderProductCard';

const NewIn = () => {
  const { productList, loading } = useProducts(); // Ensure you call useProducts as a function

  // Log the productList to debug
  console.log(productList);

  // Current date
  const currentDate = new Date();
  const fortyDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - 40)); // Calculate 40 days ago

  const newProducts = productList.filter(product => {
    // Check if timestamp exists
    if (!product.timestamp) {
      console.warn(`Product ID: ${product.id} does not have a timestamp`);
      return false; // Skip this product if timestamp is undefined
    }

    // Check the type of the timestamp and create a Date object accordingly
    let productDate;
    if (typeof product.timestamp === 'string') {
      // Format the timestamp to make it compatible with the Date constructor
      const formattedTimestamp = product.timestamp.replace('at', '').replace('UTC', '').trim();
      productDate = new Date(formattedTimestamp); // Create a Date object
    } else if (product.timestamp instanceof Date) {
      productDate = product.timestamp; // If it's already a Date object
    } else {
      console.error(`Product ID: ${product.id} has an unexpected timestamp type: ${typeof product.timestamp}`);
      return false; // Skip this product if timestamp is not a recognized type
    }

    console.log(`Product: ${product.productName}, Date: ${productDate}, Valid: ${productDate >= fortyDaysAgo}`);

    // Check if the timestamp is within the last 40 days
    return productDate >= fortyDaysAgo;
  });

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto pb-5 p-2">
      <CircularMenuGrid />
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlaceholderProductCard key={index} />
          ))} {/* Show 6 placeholders */}
        </div>
      </div>
    ); // Show loading placeholders
  }

  return (
    <div className="container pb-5 pt-6">
      <CircularMenuGrid />
      {newProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6"> {/* Define the grid layout here */}
          {newProducts.map(product => (
            <div key={product.id} className="p-2">
              <ProductCard 
                product={product}
                isFavorited={product.liked}
              /> 
            </div>
          ))}
        </div>
      ) : (
        <p>No new products available.</p>
      )}      
    </div>
  );
};

export default NewIn;
