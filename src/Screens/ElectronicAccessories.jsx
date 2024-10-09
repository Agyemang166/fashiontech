import React from 'react';
import { useProducts } from '../contexts/ProductContext'; // Adjust this path as needed
import ProductCard from '../components/Card/ProductCard'; // Your existing ProductCard component
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import CircularMenuGrid from '../components/Navbar/CircularMenuGrid';
import PlaceholderProductCard from '../components/Card/PlaceholderProductCard';

const ElectronicAccessories = () => {
  const { productList, loading } = useProducts(); // Ensure you call useProducts as a function

  // Log the productList to debug
  console.log(productList);

  // Filter products by subcategory "AgyemangDev Sobolo"
  const filteredProducts = productList.filter(product => 
    product.subcategories && product.subcategories.includes("Electronic Accessories")
  );

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto pb-5">
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
    <div className="container mx-auto pb-5 p-2">
      <CircularMenuGrid />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              isFavorited={product.liked}
            /> 
          ))}
        </div>
      ) : (
        <p>No products available in the "Electronic Accessories" subcategory.</p>
      )}
    </div>
  );
};

export default ElectronicAccessories;
