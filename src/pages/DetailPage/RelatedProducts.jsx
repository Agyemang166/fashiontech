import React, { useEffect, useState } from 'react';
import { useProducts } from '../../contexts/ProductContext'; 
import ProductCard from '../../components/Card/ProductCard'; 
import PlaceholderProductCard from '../../components/Card/PlaceholderProductCard';
import { useNavigate } from 'react-router-dom';

// Utility function to shuffle an array
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const RelatedProducts = ({ subcategory, currentProductId }) => {
  const { productList, loading } = useProducts();
  const navigate = useNavigate();
  const [shuffledProducts, setShuffledProducts] = useState([]);

  // Filter products by the provided subcategory and exclude the current product
  useEffect(() => {
    const filteredProducts = productList.filter(
      (product) => 
        product.subcategories && 
        product.category.includes(subcategory) && 
        product.id !== currentProductId
    );

    // Shuffle the filtered products and set the state
    setShuffledProducts(shuffleArray(filteredProducts));
  }, [productList, subcategory, currentProductId]);

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-5">
        <h2 className="text-xl font-bold mb-4">Related {subcategory} Products</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlaceholderProductCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0); // Scroll to the top on navigation
  };

  return (
    <div className="container mx-auto pb-[80px]">
      <h2 className="text-xl font-bold mb-4">Related {subcategory} Products</h2>
      {shuffledProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {shuffledProducts.map((product) => (
            <div key={product.id} onClick={() => handleProductClick(product.id)}>
              <ProductCard 
                product={product}
                isFavorited={product.liked}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4 text-gray-600">
          No products available in the "{subcategory}" subcategory.
        </p>
      )}
    </div>
  );
};

export default RelatedProducts;
