import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiShoppingBag } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../pages/register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setLoading(true);
    
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="register-container"
      >
        {/* Header */}
        <div className="register-header">
          <Link to="/" className="register-logo">
            <div className="register-logo-icon">
              <FiShoppingBag />
            </div>
            <span className="register-logo-text">FashionStore</span>
          </Link>
          <h1 className="register-title">Create account</h1>
          <p className="register-subtitle">Join us today</p>
        </div>

        {/* Registration Form */}
        <div className="register-card">
          <form className="register-form" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="register-form-group">
              <label htmlFor="name" className="register-label">
                Full Name
              </label>
              <div className="register-input-group">
                <FiUser className="register-input-icon" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="register-input"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="register-form-group">
              <label htmlFor="email" className="register-label">
                Email Address
              </label>
              <div className="register-input-group">
                <FiMail className="register-input-icon" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="register-input"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="register-form-group">
              <label htmlFor="password" className="register-label">
                Password
              </label>
              <div className="register-input-group">
                <FiLock className="register-input-icon" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="register-input"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="register-input-icon"
                  style={{ left: 'auto', right: '1rem' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="register-form-group">
              <label htmlFor="confirmPassword" className="register-label">
                Confirm Password
              </label>
              <div className="register-input-group">
                <FiLock className="register-input-icon" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="register-input"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="register-input-icon"
                  style={{ left: 'auto', right: '1rem' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="register-terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="register-checkbox"
              />
              <label htmlFor="terms" className="register-terms-label">
                I agree to the{' '}
                <a href="#" className="register-terms-link">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="register-terms-link">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="register-button"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

            {/* Divider */}
            <div className="register-divider">
              <span className="register-divider-text">Or continue with</span>
            </div>

            {/* Social Registration */}
            <div className="register-social">
              <a href="#" className="register-social-button">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </a>
              <a href="#" className="register-social-button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
            </div>
          </form>

          {/* Login link */}
          <div className="register-footer">
            <p className="register-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="register-footer-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;