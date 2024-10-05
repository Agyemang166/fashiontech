import React, { useEffect } from 'react';
import { useFavoriteProducts } from '../../contexts/FavoriteContext'; // Import the favorite products context
import ProductCard from '../../components/Card/ProductCard'; // Import your ProductCard component
import emptyGif from '../../Assets/Empty.gif'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Favorite = () => {
  // Get favorite products and loading state from context
  const { favoriteProducts, loading } = useFavoriteProducts(); 
  const navigate = useNavigate(); // Initialize navigate for routing

  // Optional: If your context already fetches products on mount, you can remove this
  useEffect(() => {
    // This effect is not needed if the context automatically fetches favorites on mount.
  }, []);

  // Show a loading indicator while fetching
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="bg-white p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Products</h2>
      <div className="max-w-screen-lg mx-auto"> {/* Set max width and center the content */}
        {favoriteProducts.length === 0 ? ( // Check if there are any favorite products
          <div className="flex flex-col items-center justify-center">
            <img 
              src={emptyGif} 
              alt="No favorites" 
              className="mb-4 w-1/2 md:w-1/3 lg:w-1/4" // Increased GIF size
            />
            <p>No favorite products added yet.</p>
            <button 
              onClick={() => navigate('/')} 
              className="mt-4 bg-black text-white py-2 px-4 rounded" // Styled button
            >
              Add Favorite Items
            </button>
          </div>
        ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} /> // Map over favorite products and render each ProductCard
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
