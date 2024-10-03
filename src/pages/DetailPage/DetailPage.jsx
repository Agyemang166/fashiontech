import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

// Example product data (you could also fetch this data from an API or context)
const products = [
  {
    id: 1,
    name: 'Bag of Rice THONKET',
    imageSrc: 'https://agrigoldmagazine.com/wp-content/uploads/2022/01/Wilmar.jpg',
    imageAlt: "Frytol",
    price: '$35',
    description: 'High quality rice for all your cooking needs.',
  },
  {
    id: 2,
    name: 'Nestle Milo',
    imageSrc: 'https://d2t3trus7wwxyy.cloudfront.net/catalog/product/m/i/milo-cereal-330g_2.jpg',
    imageAlt: "Nestle Milo",
    price: '$50',
    description: 'Nutritious drink for energy and vitality.',
  },
  {
    id: 3,
    name: 'Stylish Pants',
    imageSrc: 'https://pictures-ghana.jijistatic.net/39500660_NjIwLTQ5Ni04NzU2YTIzOWQ4.webp',
    imageAlt: "Stylish Pants",
    price: '$45',
    description: 'Comfortable and trendy pants for everyday wear.',
  },
  {
    id: 4,
    name: 'Tomato Paste',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-Xq-BVyvGZOZgZqrOqzz5BxWQINNjo4aThyIXD3QTGjvhgr9mTx-eqhRkAhEmLDeeJZw&usqp=CAU',
    imageAlt: "Cool Jacket",
    price: '$80',
    description: 'Rich tomato paste perfect for sauces and cooking.',
  },
];

export default function DetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  const toggleFavorite = () => {
    // Handle favorite toggle logic here
  };

  return (
    <div className="bg-white max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{product.name}</h2>
      <img
        alt={product.imageAlt}
        src={product.imageSrc}
        className="mt-4 w-full h-auto object-cover rounded-lg"
      />
      <p className="mt-2 text-lg font-medium text-gray-900">{product.price}</p>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <div className="mt-6 flex items-center">
        <button onClick={toggleFavorite} aria-label="Favorite" className="mr-2">
          <FaHeart size={20} color="black" className="transition-colors duration-200" />
        </button>
        <button className="flex items-center px-4 py-2 ml-12 border border-gray-300 rounded">
          <FaShoppingCart className="mr-1" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
