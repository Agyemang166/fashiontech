import React, { useState, useEffect, useCallback } from 'react';
import { FaHeart } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext'; 
import { addToCart, removeFromCart, toggleFavorite, subscribeToFavorites, subscribeToCartItem, updateCartItemQuantity, fetchCartItemQuantity } from '../../components/Card/ProductCardFunctions';
import { db } from '../../services/firebaseConfig'; 
import { useCurrentUser } from '../../contexts/userContext';
import { doc, getDoc } from "firebase/firestore"; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; 
import DetailPagePlaceholder from './DetailPagePlaceholder';
import ReviewSection from './ReviewSection';
import RelatedProducts from './RelatedProducts';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { productList, loading } = useProducts(); 
  const product = productList.find((p) => p.id === id || p.id === Number(id));
  const { currentUser } = useCurrentUser();
  const userId = currentUser ? currentUser.id : null;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0); // Initialize to 0
  const [quantity, setQuantity] = useState(1); 
  const [reviews, setReviews] = useState([]); 
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    if (product) {
      const fetchReviews = async () => {
        const docRef = doc(db, 'products', product.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReviews(docSnap.data().reviews || []);
        }
      };

      // Fetch related products based on the product category
      const fetchRelatedProducts = () => {
        const relatedProductList = productList.filter(
          p => p.category === product.category && p.id !== product.id
        );
        setRelatedProducts(relatedProductList);
      };

      fetchReviews();
      fetchRelatedProducts();

      if (product.discount) {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        setCurrentPrice(discountedPrice);
      } else {
        setCurrentPrice(product.price);
      }

      // Log the current category
      console.log("Current category:", product.category);
    }
  }, [product, productList]);

  useEffect(() => {
    if (userId && product) {
      const unsubscribeFavorites = subscribeToFavorites(db, userId, product.id, setIsFavorite);
      const unsubscribeCart = subscribeToCartItem(db, userId, product.id, setIsInCart);

      // Fetch saved quantity from local storage
      const savedQuantity = localStorage.getItem(`quantity_${id}`);
      if (savedQuantity) {
        setQuantity(Number(savedQuantity));
      } else {
        setQuantity(1); // default to 1 if not found
      }

      return () => {
        unsubscribeFavorites();
        unsubscribeCart();
      };
    }
  }, [userId, product]);

  useEffect(() => {
    if (isInCart) {
      fetchCartItemQuantity(db, userId, product.id, setQuantity);
    }
  }, [isInCart, product, userId]);

  useEffect(() => {
    if (isInCart) {
      updateCartItemQuantity(db, userId, product.id, quantity);
    } else {
      localStorage.setItem(`quantity_${id}`, quantity); // Save quantity when not in cart
    }
  }, [quantity, isInCart, db, userId, product?.id]);

  const handleAddToCart = useCallback(() => {
    if (isInCart) {
      removeFromCart(db, userId, product, navigate, setIsInCart);
    } else {
      addToCart(db, userId, product, currentPrice, navigate, setIsInCart, quantity);
      localStorage.setItem(`quantity_${id}`, quantity); // Save quantity when adding to cart
    }
  }, [isInCart, db, userId, product, currentPrice, navigate, quantity]);

  const handleToggleFavorite = useCallback(() => {
    toggleFavorite(db, userId, product, isFavorite, navigate, setIsFavorite);
  }, [db, userId, product, isFavorite, navigate]);

  const incrementQuantity = useCallback(() => setQuantity(prev => prev + 1), []);
  const decrementQuantity = useCallback(() => setQuantity(prev => (prev > 1 ? prev - 1 : prev)), []);

  useEffect(() => {
    if (product) {
      document.title = `${product.productName} - MALLZONIX`;
    } else {
      document.title = 'MALLZONIX'; 
    }
    return () => {
      document.title = 'MALLZONIX'; 
    };
  }, [product]);

  if (loading) return <DetailPagePlaceholder />;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-white max-w-2xl mx-auto p-2">
      <div className="w-full overflow-hidden">
        <Slider {...settings} className="h-[400px] w-full">
          {product.images.map((image, index) => (
            <div key={index} className="flex items-center justify-center w-full">
              <img
                src={image}
                alt={`${product.productName} ${index + 1} - MALLZONIX`}
                className="w-full max-h-[450px] object-cover" // Use object-cover for proper fitting
              />
            </div>
          ))}
        </Slider>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{product.productName}</h2>
      <div className="flex justify-between items-center my-2">
        {product.discount ? (
          <div>
            <span className="text-lg font-semibold text-red-600">GHC {currentPrice.toFixed(2)}</span>
            <span className="line-through text-gray-500 ml-2">GHC {product.price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="text-lg font-semibold text-gray-800">GHC {currentPrice.toFixed(2)}</span>
        )}
      </div>

      <div className="flex items-center my-4">
        <button 
          onClick={decrementQuantity} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-l-md px-4 py-[9px]"
        >
          -
        </button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="border border-gray-300 text-center p-2 w-12 h-full"
        />
        <button 
          onClick={incrementQuantity} 
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-r-md px-4 py-[9px]"
        >
          +
        </button>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center border-t-2 border-[#b2a0a0] z-50">
      <button onClick={handleToggleFavorite}>
        {isFavorite ? (
          <FaHeart className="text-red-600 mr-5" size={32} />
        ) : (
          <FaHeart className="text-gray-300 mr-5" size={32} />
        )}
      </button>

      <button
        onClick={handleAddToCart}
        className={`w-full py-2 ${isInCart ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}
      >
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>
    </div>
    
      <p className="text-1xl font-bold tracking-tight text-gray-900 mt-5">Product Description</p>
      <p className="tracking-tight text-gray-900">{product.description}</p>

      {/* Review Section */}
      <ReviewSection productId={product.id} reviews={reviews} setReviews={setReviews} />
      <RelatedProducts subcategory={product.category} currentProductId={product.id} />    </div>
  );
}
