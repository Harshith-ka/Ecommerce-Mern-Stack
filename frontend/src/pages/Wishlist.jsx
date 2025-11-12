import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiTrash2, FiEye } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../pages/wishlist.css';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get('/api/users/wishlist', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWishlistItems(data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await axios.post(`/api/users/wishlist/${productId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setWishlistItems(prev => prev.filter(item => item._id !== productId));
      alert('Removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const addToCartFromWishlist = (product) => {
    addToCart(product, 1);
    alert('Added to cart!');
  };

  const moveAllToCart = () => {
    wishlistItems.forEach(item => addToCart(item, 1));
    alert('All items added to cart!');
  };

  if (loading) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-loading">
            <div className="loading-spinner" style={{ margin: '0 auto 1rem' }} />
            <p>Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="wishlist-empty">
            <div className="wishlist-empty-icon">
              <FiHeart />
            </div>
            <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
            <p className="wishlist-empty-description">
              Save items you love for later
            </p>
            <Link to="/products" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="wishlist-content"
        >
          {/* Header */}
          <div className="wishlist-header">
            <div>
              <h1 className="wishlist-title">My Wishlist</h1>
              <p className="wishlist-subtitle">{wishlistItems.length} items</p>
            </div>
            <div className="wishlist-actions">
              <button
                onClick={moveAllToCart}
                className="wishlist-add-all"
              >
                Add All to Cart
              </button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="wishlist-grid">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="wishlist-item"
              >
                {/* Product Image */}
                <div className="wishlist-item-image">
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                  />
                  
                  {/* Action Buttons */}
                  <div className="wishlist-item-actions">
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="wishlist-action-button remove"
                      title="Remove from wishlist"
                    >
                      <FiTrash2 />
                    </button>
                    <Link
                      to={`/product/${item._id}`}
                      className="wishlist-action-button"
                      title="View product"
                    >
                      <FiEye />
                    </Link>
                  </div>

                  {/* Quick Add to Cart */}
                  <div className="wishlist-quick-add">
                    <button
                      onClick={() => addToCartFromWishlist(item)}
                      className="wishlist-add-button"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="wishlist-item-info">
                  <h3 className="wishlist-item-name">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </h3>
                  <p className="wishlist-item-description">{item.description}</p>
                  
                  <div className="wishlist-item-details">
                    <div className="wishlist-item-price">
                      <span className="wishlist-item-current">${item.price}</span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="wishlist-item-original">${item.originalPrice}</span>
                      )}
                    </div>
                    
                    <span className={`wishlist-item-stock ${item.inventory > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {item.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Wishlist;