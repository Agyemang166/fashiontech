import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import { arrayUnion, arrayRemove, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../services/firebaseConfig';
import { useCurrentUser } from '../../contexts/userContext';
import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed

const ReviewSection = ({ productId, reviews, setReviews }) => {
  const { currentUser } = useCurrentUser();
  const userId = currentUser ? currentUser.id : null;
  const userName = currentUser ? currentUser.name : "Unknown User"; // Accessing the user's name

  // Extract the first two names from the user's full name
  const formattedUserName = useMemo(() => {
    if (userName) {
      const nameParts = userName.split(' ');
      return nameParts.length > 2 ? `${nameParts[0]} ${nameParts[1]}` : userName; // Show first two names
    }
    return "Unknown User";
  }, [userName]);

  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const userReview = useMemo(() => reviews.find((review) => review.userId === userId), [reviews, userId]);

  useEffect(() => {
    const fetchReviews = async () => {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setReviews(docSnap.data().reviews || []);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId, setReviews]);

  const renderStarRating = useCallback(
    (rating, setRating) => (
      <div className="flex">
        {[...Array(5)].map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setRating(index + 1)}
          >
            {index < rating ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-400" />}
          </button>
        ))}
      </div>
    ),
    []
  );

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert('Kindly log in to your Mallzonix account to add a review.');
      return;
    }

    if (!reviewText || rating === 0) {
      alert('Please add a review and rating.');
      return;
    }
  
    const newReview = {
      userId,
      text: reviewText,
      rating,
      date: new Date().toISOString(),
      userName: formattedUserName,
    };
  
    try {
      const productRef = doc(db, 'products', productId);
  
      if (editingReview) {
        const updatedReviews = reviews.map((review) =>
          review.userId === userId ? { ...review, text: reviewText, rating } : review
        );
        await updateDoc(productRef, { reviews: updatedReviews });
        setReviews(updatedReviews);
        setEditingReview(null);
      } else {
        const existingReview = reviews.find(review => review.userId === userId);
  
        if (existingReview) {
          alert('You have already submitted a review for this product.');
        } else {
          await updateDoc(productRef, { reviews: arrayUnion(newReview) });
          setReviews((prevReviews) => [...prevReviews, newReview]);
        }
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
      const productRef = doc(db, 'products', productId);
      await updateDoc(productRef, { reviews: arrayRemove(reviewToDelete) });
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

  return (
    <div className="my-6 mb-[60px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-4">Reviews</h3>
        {!currentUser ? (
          <Link to="/sign-up" className="text-blue-500 hover:text-blue-700">
            Sign up to review
          </Link>
        ) : userReview ? ( // Check if the user has already reviewed
          <div></div>
        ) : (
          // Show "Add Review" button if the user is logged in and hasn't reviewed yet
          <button
            onClick={() => setShowReviewForm(true)} // Show the review form
            className="bg-white text-black py-2 px-4 rounded"
          >
            Add a Review
          </button>
        )}
      </div>
  
      {reviews.length > 0 ? (
        <div className="mb-4">
          <p>{reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}</p>
        </div>
      ) : (
        <p>Be the first to add a review to this product.</p>
      )}
  
      {reviews.length > 0 &&
        reviews
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((review, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center justify-between">
                {renderStarRating(review.rating)}
                {review.userId === userId && (
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleEditReview(review)} className="text-blue-500">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteReview(review)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <span className="ml-2 text-gray-500">{review.userName}</span>
                <span className="ml-2 text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <p>{review.text}</p>
            </div>
          ))}
  
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
  );
  
};

export default ReviewSection;
