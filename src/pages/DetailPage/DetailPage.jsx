import React, { useState, useEffect } from 'react';
import { FaHeart, FaStar, FaRegStar, FaPlus, FaEdit, FaTrash } from 'react-icons/fa'; // Import additional icons
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/ProductContext'; 
import { addToCart, removeFromCart, toggleFavorite, subscribeToFavorites, subscribeToCartItem, updateCartItemQuantity, fetchCartItemQuantity } from '../../components/Card/ProductCardFunctions';
import { db } from '../../services/firebaseConfig'; 
import { useCurrentUser } from '../../contexts/userContext';
import { collection, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore"; 
import Slider from 'react-slick'; // Import Slider component from react-slick
import "slick-carousel/slick/slick.css"; // Import slick-carousel CSS
import "slick-carousel/slick/slick-theme.css"; //


const settings = {
  dots: true, // Show dots below the carousel
  infinite: true, // Loop through images
  speed: 500, // Transition speed
  slidesToShow: 1, // Show one slide at a time
  slidesToScroll: 1, // Scroll one slide at a time
  adaptiveHeight: true, // Adapt height based on the current image
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
  const [currentPrice, setCurrentPrice] = useState(product?.price || 0);
  const [quantity, setQuantity] = useState(1); 
  const [reviewText, setReviewText] = useState(''); 
  const [rating, setRating] = useState(0); 
  const [reviews, setReviews] = useState([]); 
  const [showReviewForm, setShowReviewForm] = useState(false); 
  const [editingReview, setEditingReview] = useState(null); // Track the review being edited

  useEffect(() => {
    if (product) {
      const fetchReviews = async () => {
        const docRef = doc(db, 'products', product.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setReviews(docSnap.data().reviews || []);
        }
      };
      fetchReviews();
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      if (isInCart) {
        fetchCartItemQuantity(db, userId, product.id, setQuantity); 
      } else {
        const savedQuantity = localStorage.getItem(`quantity_${id}`);
        setQuantity(savedQuantity ? Number(savedQuantity) : 1); 
      }
    }
  }, [isInCart, product, id, userId]);

  useEffect(() => {
    if (userId && product) {
      const unsubscribeFavorites = subscribeToFavorites(db, userId, product.id, setIsFavorite);
      const unsubscribeCart = subscribeToCartItem(db, userId, product.id, setIsInCart);

      return () => {
        unsubscribeFavorites();
        unsubscribeCart();
      };
    }
  }, [userId, product]);

  useEffect(() => {
    if (!isInCart) {
      localStorage.setItem(`quantity_${id}`, quantity);
    }
  }, [quantity, id, isInCart]);

  useEffect(() => {
    if (isInCart) {
      updateCartItemQuantity(db, userId, product.id, quantity);
    }
  }, [quantity, isInCart, db, userId, product.id]);

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(db, userId, product, navigate, setIsInCart);
    } else {
      addToCart(db, userId, product, currentPrice, navigate, setIsInCart, quantity);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(db, userId, product, isFavorite, navigate, setIsFavorite);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) {
      alert('Please add a review and rating.');
      return;
    }

    const newReview = {
      userId,
      text: reviewText,
      rating,
      date: new Date().toISOString(),
    };

    try {
      const productRef = doc(db, 'products', product.id);
      
      if (editingReview) {
        const updatedReviews = reviews.map((review) =>
          review.userId === userId ? { ...review, text: reviewText, rating } : review
        );
        await updateDoc(productRef, { reviews: updatedReviews });
        setReviews(updatedReviews);
        setEditingReview(null);
      } else {
        await updateDoc(productRef, {
          reviews: arrayUnion(newReview),
        });
        setReviews((prevReviews) => [...prevReviews, newReview]);
      }

      setReviewText('');
      setRating(0);
      setShowReviewForm(false); 
    } catch (error) {
      console.error('Error adding review: ', error);
    }
  };

  const handleDeleteReview = async (reviewToDelete) => {
    try {
      const productRef = doc(db, 'products', product.id);
      await updateDoc(productRef, {
        reviews: arrayRemove(reviewToDelete),
      });
      setReviews((prevReviews) => prevReviews.filter((review) => review !== reviewToDelete));
    } catch (error) {
      console.error('Error deleting review: ', error);
    }
  };

  const handleEditReview = (review) => {
    setReviewText(review.text);
    setRating(review.rating);
    setEditingReview(review);
    setShowReviewForm(true);
  };

  const renderStarRating = (rating, setRating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setRating(index + 1)} // Update the rating based on the star clicked
          >
            {index < rating ? (
              <FaStar className="text-yellow-500" />
            ) : (
              <FaRegStar className="text-gray-400" />
            )}
          </button>
        ))}
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="bg-white max-w-2xl mx-auto p-4">
    <div className="w-full overflow-hidden"> {/* Ensure it covers full width */}
    <Slider {...settings} className="h-[400px] w-full"> {/* Make Slider full width */}
      {product.images.map((image, index) => (
        <div key={index} className="h-full flex items-center justify-center"> {/* Center content */}
          <img src={image} alt={`${product.productName} ${index + 1}`} className="h-full object-cover w-full" /> {/* Full width image */}
        </div>
      ))}
    </Slider>
  </div>

      <h2 className="text-2xl font-bold tracking-tight text-gray-900">{product.productName}</h2>
      <div className="flex justify-between items-center my-4">
        <span className="text-lg font-semibold text-gray-800">${currentPrice.toFixed(2)}</span>
        <button onClick={handleToggleFavorite}>
          {isFavorite ? <FaHeart className="text-red-600" /> : <FaHeart className="text-gray-300" />}
        </button>
      </div>
      <div className="flex items-center my-4">
        <button onClick={decrementQuantity} className="bg-gray-300 rounded-l-md px-3 py-1">-</button>
        <input
          type="text"
          value={quantity}
          readOnly
          className="border border-gray-300 text-center w-12"
        />
        <button onClick={incrementQuantity} className="bg-gray-300 rounded-r-md px-3 py-1">+</button>
      </div>
      <button onClick={handleAddToCart} className={`w-full mb-5 py-2 ${isInCart ? 'bg-red-500' : 'bg-green-500'} text-white rounded`}>
        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
      </button>

      <p4 className="text-1xl font-bold tracking-tight text-gray-900 mt-5">Product Description</p4>
      <p className=" tracking-tight text-gray-900">{product.description}</p>

            {/* Review Section */}
            <div className="my-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold mb-4">Reviews</h3>
              {/* Add Review Icon and Text */}
              <button 
                className="flex items-center text-blue-500 hover:text-blue-700"
                onClick={() => setShowReviewForm((prev) => !prev)} // Toggle the form visibility
              >
                <FaPlus className="mr-1" />
                <span>Add your review</span>
              </button>
            </div>
    
            {/* Display number of reviews */}
            {reviews.length > 0 ? (
              <div className="mb-4">
                <p>{reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}</p>
              </div>
            ) : (
              <p>Be the first to add a review.</p>
            )}
    
            {/* Map over existing reviews */}
            {reviews.length > 0 && (
              reviews.map((review, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center">
                    {renderStarRating(review.rating)}
                    <p className="ml-2 text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <p>{review.text}</p>
                  {review.userId === userId && (
                    <div className="flex items-center space-x-4">
                      <button onClick={() => handleEditReview(review)} className="text-blue-500">
                        <FaEdit /> Edit
                      </button>
                      <button onClick={() => handleDeleteReview(review)} className="text-red-500">
                        <FaTrash /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
    
            {/* Toggle review form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mt-6">
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="border p-2 w-full mb-4"
                  rows="4"
                  placeholder="Write your review here..."
                />
                <div className="mb-4">
                  <label>Rating: </label>
                  {renderStarRating(rating, setRating)}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {editingReview ? 'Update Review' : 'Submit Review'}
                </button>
              </form>
            )}
          </div>
    </div>
  );
}
