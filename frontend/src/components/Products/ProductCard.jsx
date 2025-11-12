import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "./productcard.css";

const ProductCard = ({ product, viewMode = "grid" }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    toast.success("Added to cart!");
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    toast.success("Added to wishlist!");
  };

  const isTech = product.specs && product.specs.length > 0;
  const isFashion = product.sizes || product.colors;

  /* -------------------------------------------------------------------------- */
  /* ✅ LIST VIEW                                                               */
  /* -------------------------------------------------------------------------- */

  if (viewMode === "list") {
    return (
      <motion.div whileHover={{ scale: 1.02 }} className="pc-list-card">
        <Link to={`/product/${product._id}`} className="pc-list-link">
          <div className="pc-list-image-box">
            <img
              src={product.images?.[0]?.url}
              alt={product.name}
              className="pc-list-image"
            />
          </div>

          <div className="pc-list-content">
            <h3 className="pc-title">{product.name}</h3>
            <p className="pc-description">{product.description}</p>

            <div className="pc-badges">
              {isFashion &&
                product.sizes?.slice(0, 3).map((size) => (
                  <span key={size} className="pc-size-chip">
                    {size}
                  </span>
                ))}

              {isTech &&
                product.specs?.slice(0, 2).map((spec) => (
                  <span key={spec} className="pc-spec-chip">
                    {spec}
                  </span>
                ))}
            </div>

            <div className="pc-rating-row">
              <FiStar className="pc-star active" />
              <span className="pc-rating-value">{product.rating || "0"}</span>
              <span className="pc-review-count">({product.numReviews})</span>
            </div>

            <div className="pc-list-bottom-row">
              <div className="pc-price-box">
                <span className="pc-price">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="pc-original-price">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="pc-action-btns">
          <button className="pc-wishlist-btn" onClick={handleAddToWishlist}>
            <FiHeart />
          </button>

          <button className="pc-cart-btn" onClick={handleAddToCart}>
            <FiShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </motion.div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /* ✅ GRID VIEW                                                               */
  /* -------------------------------------------------------------------------- */

  return (
    <motion.div whileHover={{ y: -5 }} className="pc-grid-card">
      <Link to={`/product/${product._id}`} className="pc-grid-link">
        <div className="pc-grid-image-container">
          <img
            src={product.images?.[0]?.url}
            alt={product.name}
            className="pc-grid-image"
          />

          {/* ✅ Wishlist button overlay */}
          <button className="pc-grid-wishlist" onClick={handleAddToWishlist}>
            <FiHeart />
          </button>

          {/* ✅ Add to cart hover button overlay */}
          <div className="pc-grid-addcart-box">
            <button className="pc-grid-addcart-btn" onClick={handleAddToCart}>
              <FiShoppingCart />
            </button>
          </div>
        </div>

        <div className="pc-grid-content">
          <h3 className="pc-title line-1">{product.name}</h3>
          <p className="pc-description line-2">{product.description}</p>

          <div className="pc-badges">
            {isFashion &&
              product.colors?.slice(0, 3).map((color, idx) => (
                <span
                  key={idx}
                  className="pc-color-dot"
                  style={{ background: color }}
                />
              ))}

            {isTech &&
              product.specs?.slice(0, 2).map((spec) => (
                <span key={spec} className="pc-spec-chip">
                  {spec}
                </span>
              ))}
          </div>

          <div className="pc-grid-bottom-row">
            <div className="pc-price-box">
              <span className="pc-price">${product.price}</span>
              {product.originalPrice > product.price && (
                <span className="pc-original-price">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            <div className="pc-rating-box">
              <FiStar className="pc-star active" />
              <span className="pc-rating-value">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
