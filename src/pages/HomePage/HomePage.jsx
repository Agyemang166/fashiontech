import React, { useContext } from 'react';
import Carousel from '../../components/Carousels/LandingCarousel';
import ProductCard from '../../components/Card/ProductCard';
import CircularMenuGrid from '../../components/Navbar/CircularMenuGrid';
import { useProducts } from '../../contexts/ProductContext'; 

const HomePage = () => {
  const { productList, addToCart, toggleLike } = useProducts(); // Use the ProductContext

  return (
    <div>
      <Carousel />
      <CircularMenuGrid />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6">
        {productList.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            toggleFavorite={toggleLike} // Use toggleLike instead of toggleFavorite
            isFavorited={product.liked} // Check the liked property of the product
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
