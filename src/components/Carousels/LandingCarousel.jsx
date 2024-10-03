import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

// Utility function to randomize array items
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Carousel = () => {
  const [shuffledItems, setShuffledItems] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const carouselItems = [
    {
      id: 1,
      image: 'https://activecarestore.co.uk/cdn/shop/articles/blog_1.jpg?v=1574317621',
      link: '/perfumes',
      title: 'Discover Perfumes',
    },
    {
      id: 2,
      image: 'https://marketplace.canva.com/EAFHG6sbLsQ/1/0/1600w/canva-brown-beige-simple-special-sale-banner-lQfPvhnznqs.jpg',
      link: '/women-clothing',
      title: 'Women’s Fashion',
    },
    {
      id: 3,
      image: 'https://png.pngtree.com/element_our/png/20180911/new-arrival-golden-png_88341.jpg',
      link: '/new-in',
      title: 'New Arrivals',
    },
    {
      id: 4,
      image: 'https://www.westcoastselfstorage.com/wp-content/uploads/2018/06/Courtesy-Sole-Stacks.png',
      link: '/shoes-footwear',
      title: 'Footwear Collection',
    },
    {
      id: 5,
      image: 'https://5.imimg.com/data5/SELLER/Default/2023/1/SM/GS/DW/44069440/acce-500x500.png',
      link: '/electronics',
      title: 'Latest Electronics',
    },
    {
      id: 6,
      image: 'https://img.freepik.com/premium-photo/department-computers-electronics-store-choosing-laptop-store_245974-2796.jpg',
      link: '/laptops',
      title: 'Laptops',
    },
    {
      id: 7,
      image: 'https://img.freepik.com/premium-photo/men-s-collection-things-used-daily_53876-1549.jpg',
      link: '/men-clothing',
      title: 'Men Fashion',
    },
    {
      id: 8,
      image: 'https://img.freepik.com/premium-photo/men-s-collection-things-used-daily_53876-1549.jpg',
      link: '/mobile-phones',
      title: 'Men Fashion',
    },
  ];

  // Randomize titles on each render
  useEffect(() => {
    const shuffled = shuffleArray(carouselItems);
    setShuffledItems(shuffled);
  }, []);

  return (
    <div className="carousel-container mx-auto max-w-2xl overflow-hidden">
      <Slider {...settings}>
        {shuffledItems.map(item => (
          <Link to={item.link} key={item.id}>
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title} 
                style={{
                  width: '100%', 
                  height: '300px', 
                  objectFit: 'cover' // Ensure the images are uniformly styled
                }} 
                className="block" 
              />
              <div className="absolute bottom-2 left-4">
                <Typography 
                  variant="h6" 
                  style={{ 
                    color: 'white', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    padding: '0.5rem', 
                    borderRadius: '0.25rem' 
                  }}
                >
                  {item.title}
                </Typography>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
