import React from 'react';
import Carousel from '../../components/Carousels/LandingCarousel';
import ProductCard from '../../components/Card/ProductCard';
import CircularMenuGrid from '../../components/Navbar/CircularMenuGrid';
import { useProducts } from '../../contexts/ProductContext'; 

const HomePage = () => {
  const { productList } = useProducts(); // Use the ProductContext

  return (
    <div>
      <Carousel />
      <CircularMenuGrid />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6">
        {productList.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorited={product.liked} 
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
