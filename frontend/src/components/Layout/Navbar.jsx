import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiSearch, 
  FiMenu, 
  FiX,
  FiShoppingCart
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import '../Layout/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <div className="navbar-logo">
            <FiShoppingBag />
          </div>
          <span className="navbar-brand-text">FashionStore</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="navbar-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <FiSearch className="navbar-search-icon" />
          </form>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="navbar-nav">
          <li>
            <Link to="/products" className="navbar-link">
              Products
            </Link>
          </li>
          
          <li>
            <Link to="/wishlist" className="navbar-icon-link">
              <FiHeart />
              <span className="navbar-badge">0</span>
            </Link>
          </li>

          <li>
            <Link to="/cart" className="navbar-icon-link">
              <FiShoppingCart />
              <span className="navbar-badge">{getCartItemsCount()}</span>
            </Link>
          </li>

          {user ? (
            <li className="navbar-user">
              <button className="navbar-user-button">
                <FiUser />
                <span>{user.name}</span>
              </button>
              <div className="navbar-dropdown">
                <Link to="/profile" className="navbar-dropdown-link">
                  Profile
                </Link>
                <Link to="/orders" className="navbar-dropdown-link">
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="navbar-dropdown-link">
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="navbar-dropdown-link"
                  style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="btn btn-primary">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="navbar-mobile-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* Mobile Search */}
        <div className="navbar-mobile-search">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <FiSearch className="navbar-search-icon" />
          </form>
        </div>

        {/* Mobile Navigation Links */}
        <Link 
          to="/products" 
          className="navbar-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Products
        </Link>
        
        <Link 
          to="/wishlist" 
          className="navbar-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Wishlist
        </Link>
        
        <Link 
          to="/cart" 
          className="navbar-link"
          onClick={() => setIsMenuOpen(false)}
        >
          Cart ({getCartItemsCount()})
        </Link>

        {user ? (
          <>
            <Link 
              to="/profile" 
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
            <Link 
              to="/orders" 
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            {user.role === 'admin' && (
              <Link 
                to="/admin" 
                className="navbar-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="navbar-link"
              style={{ background: 'none', border: 'none', textAlign: 'left' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link 
              to="/login" 
              className="navbar-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="btn btn-primary"
              onClick={() => setIsMenuOpen(false)}
              style={{ display: 'block', textAlign: 'center' }}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;