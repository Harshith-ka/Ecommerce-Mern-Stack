import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiShoppingCart, FiShare2, FiTruck, FiShield, FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ReviewSection from '../components/Products/ReviewSection';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import '../pages/productdetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0].name);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      alert('Please select a size');
      return;
    }
    addToCart(product, quantity, selectedSize, selectedColor);
    alert('Added to cart!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleAddToWishlist = () => {
    if (!user) {
      alert('Please login to add to wishlist');
      return;
    }
    // Implement wishlist functionality
    alert('Added to wishlist!');
  };

  if (loading) {
    return (
      <div className="product-details">
        <div className="product-details-container">
          <div className="loading-spinner" style={{ margin: '2rem auto' }} />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details">
        <div className="product-details-container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h2>Product not found</h2>
            <button onClick={() => navigate('/products')} className="btn btn-primary">
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FiArrowLeft />
          </button>
          <span>/</span>
          <a href="/products">Products</a>
          <span>/</span>
          <a href={`/products?category=${product.category}`}>{product.category}</a>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-main">
          {/* Product Images */}
          <div className="product-images">
            <div className="product-image-main">
              <img
                src={product.images[selectedImage]?.url}
                alt={product.name}
              />
            </div>
            {product.images.length > 1 && (
              <div className="product-image-thumbnails">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`product-thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img src={image.url} alt={`${product.name} ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-rating">
              <div className="product-stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`product-star ${i < Math.floor(product.rating) ? '' : 'empty'}`}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="product-review-count">({product.numReviews} reviews)</span>
            </div>

            <div className={`product-stock ${product.inventory > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
            </div>

            {/* Pricing */}
            <div className="product-pricing">
              <span className="product-price-current">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="product-price-original">${product.originalPrice}</span>
                  <span className="product-discount">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            <p className="product-description">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="product-options">
                <label className="option-label">Size: {selectedSize}</label>
                <div className="option-values">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`option-value ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="product-options">
                <label className="option-label">Color: {selectedColor}</label>
                <div className="option-values">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      className={`option-color ${selectedColor === color.name ? 'selected' : ''}`}
                      style={{ backgroundColor: color.code }}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="product-quantity">
              <span className="quantity-label">Quantity:</span>
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="product-actions">
              <button
                className="btn btn-primary product-action-primary"
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
              >
                <FiShoppingCart />
                Add to Cart
              </button>
              <button
                className="btn btn-secondary product-action-secondary"
                onClick={handleBuyNow}
                disabled={product.inventory === 0}
              >
                Buy Now
              </button>
              <div className="product-action-buttons">
                <button className="action-button" onClick={handleAddToWishlist}>
                  <FiHeart />
                </button>
                <button className="action-button">
                  <FiShare2 />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="product-feature">
                <div className="feature-icon shipping">
                  <FiTruck />
                </div>
                <div className="feature-text">
                  <span className="feature-title">Free Shipping</span>
                  <span className="feature-description">On orders over $50</span>
                </div>
              </div>
              <div className="product-feature">
                <div className="feature-icon warranty">
                  <FiShield />
                </div>
                <div className="feature-text">
                  <span className="feature-title">2-Year Warranty</span>
                  <span className="feature-description">Quality guaranteed</span>
                </div>
              </div>
              <div className="product-feature">
                <div className="feature-icon returns">
                  <FiShoppingCart />
                </div>
                <div className="feature-text">
                  <span className="feature-title">Easy Returns</span>
                  <span className="feature-description">30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={id} />
      </div>
    </div>
  );
};

export default ProductDetails;