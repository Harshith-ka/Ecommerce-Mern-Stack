import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../pages/login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-container"
      >
        {/* Header */}
        <div className="login-header">
          <Link to="/" className="login-logo">
            <div className="login-logo-icon">
              <FiShoppingBag />
            </div>
            <span className="login-logo-text">FashionStore</span>
          </Link>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-label">
                Email Address
              </label>
              <div className="login-input-group">
                <FiMail className="login-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-form-group">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <div className="login-input-group">
                <FiLock className="login-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="login-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="login-input-icon"
                  style={{ left: 'auto', right: '1rem' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="login-options">
              <label className="login-remember">
                <input type="checkbox" className="login-checkbox" />
                <span className="login-checkbox-label">Remember me</span>
              </label>
              <a href="#" className="login-forgot">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span className="login-divider-text">Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="login-social">
              <a href="#" className="login-social-button">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </a>
              <a href="#" className="login-social-button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </form>

          {/* Sign up link */}
          <div className="login-footer">
            <p className="login-footer-text">
              Don't have an account?{' '}
              <Link to="/register" className="login-footer-link">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;