import React from 'react';
import Carousel from '../../components/Carousels/LandingCarousel';
import ProductCard from '../../components/Card/ProductCard';
import PlaceholderProductCard from '../../components/Card/PlaceholderProductCard'; // Import the placeholder card
import CircularMenuGrid from '../../components/Navbar/CircularMenuGrid';
import { useProducts } from '../../contexts/ProductContext';

const HomePage = () => {
  const { productList, loading } = useProducts(); // Make sure loading state is included

  return (
    <div className='p-2'>
      <Carousel />
      <div className='p-2'>
        <CircularMenuGrid />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => <PlaceholderProductCard key={index} />) // Show 6 placeholders
          : productList.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorited={product.liked}
              />
            ))
        }
      </div>
    </div>
  );
};

export default HomePage;
