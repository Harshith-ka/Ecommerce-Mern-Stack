import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import '../pages/cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(cartId, newQuantity);
  };

  const handleRemoveItem = (cartId, productName) => {
    if (window.confirm(`Remove ${productName} from cart?`)) {
      removeFromCart(cartId);
    }
  };

  const handleClearCart = () => {
    if (cartItems.length === 0) return;
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <FiShoppingBag />
            </div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-description">
              Start shopping to add items to your cart
            </p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button onClick={handleClearCart} className="cart-clear">
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cart-item"
              >
                <div className="cart-item-content">
                  <div className="cart-item-image">
                    <img src={item.images[0]?.url} alt={item.name} />
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <h3 className="cart-item-name">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
                        </h3>
                        <div className="cart-item-attributes">
                          {item.size && (
                            <span className="cart-item-attribute">Size: {item.size}</span>
                          )}
                          {item.color && (
                            <span className="cart-item-attribute">Color: {item.color}</span>
                          )}
                        </div>
                      </div>
                      <span className="cart-item-price">${item.price}</span>
                    </div>

                    <div className="cart-item-controls">
                      <div className="cart-item-quantity">
                        <button
                          className="quantity-button"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                        >
                          <FiMinus />
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          className="quantity-button"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                        >
                          <FiPlus />
                        </button>
                      </div>
                      
                      <span className="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      
                      <button
                        className="cart-item-remove"
                        onClick={() => handleRemoveItem(item.cartId, item.name)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-summary">
            <h3 className="cart-summary-title">Order Summary</h3>
            
            <div className="cart-summary-details">
              <div className="cart-summary-row">
                <span className="cart-summary-label">Subtotal</span>
                <span className="cart-summary-value">${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-row">
                <span className="cart-summary-label">Shipping</span>
                <span className="cart-summary-value">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              
              <div className="cart-summary-row">
                <span className="cart-summary-label">Tax</span>
                <span className="cart-summary-value">${tax.toFixed(2)}</span>
              </div>
              
              <div className="cart-summary-row cart-summary-total">
                <span className="cart-summary-label">Total</span>
                <span className="cart-summary-value">${total.toFixed(2)}</span>
              </div>
            </div>

            {subtotal < 50 && (
              <div className="cart-shipping-notice">
                <p>
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            <div className="cart-summary-actions">
              {user ? (
                <Link to="/checkout" className="btn btn-primary">
                  Proceed to Checkout
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary">
                  Login to Checkout
                </Link>
              )}
              
              <Link to="/products" className="btn btn-secondary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;