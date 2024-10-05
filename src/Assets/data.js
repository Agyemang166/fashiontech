const products = [
  {
    id: 1,
    name: 'Samsung Galaxy S21',
    categories: 'Electronics',
    subcategories: ['Mobile Phones'],
    details: {
      brand: 'Samsung',
      model: 'Galaxy S21',
      storage: '128GB',
      color: 'Phantom Gray',
      processor: 'Exynos 2100',
      camera: '108MP Rear, 10MP Front',
      battery: '4000mAh',
      display: '6.2-inch Dynamic AMOLED',
    },
    price: 799,
    discount: 0, // No discount
    discountedPrice: 799, // Same as price
    description: 'The Samsung Galaxy S21 offers high-end performance with its Exynos 2100 processor and Dynamic AMOLED display.',
    owner: {
      name: 'John Doe',
      phone: '123-456-7890',
      email: 'john.doe@electrostore.com',
    },
    images: [
      'https://www.electromart.com.gh/wp-content/uploads/2024/06/Samsung-Galaxy-A35-1.webp',
      'https://images.samsung.com/is/image/samsung/p6pim/levant/sm-g991bzadmid/gallery/levant-galaxy-s21-5g-g991-sm-g991bzadmid-368405752?$720_576_PNG$',
    ],
  },
  {
    id: 2,
    name: 'Nike Air Max 270',
    categories: 'Apparel',
    subcategories: ['Footwear', 'Men'],
    details: {
      brand: 'Nike',
      color: 'Black/White',
      sizes: ['8', '9', '10', '11'],
      material: 'Textile and Synthetic',
      type: 'Running Shoes',
      cushioning: 'Air Max Cushioning',
    },
    price: 150,
    discount: 10, // 10% discount
    discountedPrice: 135, // 10% off the original price
    description: 'The Nike Air Max 270 features a large Air unit in the heel, providing plush comfort and modern style.',
    owner: {
      name: 'Alice Johnson',
      phone: '987-654-3210',
      email: 'alice@sportswearoutlet.com',
    },
    images: [
      'https://static.nike.com/a/images/t_default/95b64eb8-24b3-44bb-b1d6-f7e47b4c6519/air-max-270-mens-shoes-KkLcGR.png',
    ],
  },
  {
    id: 3,
    name: 'Adidas Shirt',
    categories: 'Apparel',
    subcategories: ['Men', 'Women'],
    details: {
      brand: 'Adidas',
      color: 'Black/White',
      material: 'Cotton',
      type: 'T-Shirt',
    },
    price: 340,
    discount: 0, // No discount
    discountedPrice: 340, // Same as price
    description: 'Elevate your casual style with the exclusive Adidas shirt in sleek black and white. Crafted from high-quality cotton, this stylish tee combines comfort and performance with a minimalistic design featuring the iconic Adidas logo.',
    owner: {
      name: 'Revelation',
      location: 'Adum',
      phone: '04533285329',
    },
    images: [
      'https://firebasestorage.googleapis.com/v0/b/technestmall.appspot.com/o/images%2Faddidas%202.jpeg?alt=media&token=e8ba2003-fd7b-4a6c-9343-62a7a487a4db',
      'https://firebasestorage.googleapis.com/v0/b/technestmall.appspot.com/o/images%2Faddidas%201.jpeg?alt=media&token=9516e489-1c58-4113-86a9-ef41f801a581',
    ],
  },
  {
    id: 4,
    name: 'Nike Air Max 270',
    categories: 'Apparel',
    subcategories: ['Footwear', 'Men'],
    details: {
      brand: 'Nike',
      color: 'Black/White',
      sizes: ['8', '9', '10', '11'],
      material: 'Textile and Synthetic',
      type: 'Running Shoes',
      cushioning: 'Air Max Cushioning',
    },
    price: 150,
    discount: 15, // 15% discount
    discountedPrice: 127.5, // 15% off the original price
    description: 'The Nike Air Max 270 features a large Air unit in the heel, providing plush comfort and modern style.',
    owner: {
      name: 'Alice Johnson',
      phone: '987-654-3210',
      email: 'alice@sportswearoutlet.com',
    },
    images: [
      'https://static.nike.com/a/images/t_default/95b64eb8-24b3-44bb-b1d6-f7e47b4c6519/air-max-270-mens-shoes-KkLcGR.png',
    ],
  },
];

export default products;
