import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiUser } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import '../Products/reviewsection.css';

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    images: []
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/reviews/product/${productId}`);
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    try {
      await axios.post('/api/reviews', {
        product: productId,
        rating: newReview.rating,
        comment: newReview.comment,
        images: newReview.images
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Review submitted successfully!');
      setNewReview({ rating: 5, comment: '', images: [] });
      setShowReviewForm(false);
      fetchReviews();
    } catch (error) {
      alert('Error submitting review');
      console.error('Review submission error:', error);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <div className="review-section">
      <h3 className="review-section-title">Customer Reviews</h3>

      {/* Review Summary */}
      <div className="review-summary">
        <div className="review-rating-overview">
          <div className="review-average">{averageRating.toFixed(1)}</div>
          <div className="review-stars">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`review-star ${i < Math.floor(averageRating) ? '' : 'empty'}`}
                fill={i < Math.floor(averageRating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <div className="review-count">Based on {reviews.length} reviews</div>
        </div>

        <div className="review-write-button">
          {user ? (
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn btn-primary"
            >
              Write a Review
            </button>
          ) : (
            <p className="review-login-prompt">Please login to write a review</p>
          )}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="review-form"
        >
          <h4 className="review-form-title">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="review-form-content">
            <div className="review-form-group">
              <label className="review-form-label">Rating</label>
              <div className="review-rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className={`review-rating-star ${star <= newReview.rating ? 'active' : ''}`}
                  >
                    <FiStar fill={star <= newReview.rating ? 'currentColor' : 'none'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="review-form-group">
              <label className="review-form-label">Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows="4"
                className="review-form-textarea"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="review-form-actions">
              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="review-list">
        {reviews.length === 0 ? (
          <div className="review-empty">
            <p>No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <div className="review-header">
                <div className="review-avatar">
                  <FiUser />
                </div>
                <div className="review-user-info">
                  <div className="review-user-name">
                    {review.user?.name || 'Anonymous'}
                  </div>
                  <div className="review-meta">
                    <div className="review-stars">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`review-star ${i < review.rating ? '' : 'empty'}`}
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="review-content">
                {review.comment}
              </div>

              {review.images && review.images.length > 0 && (
                <div className="review-images">
                  {review.images.map((image, index) => (
                    <div key={index} className="review-image">
                      <img src={image.url} alt={`Review ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;