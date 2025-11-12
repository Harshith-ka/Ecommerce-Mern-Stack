import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import '../Layout/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="footer-logo-icon">F</div>
              <span className="footer-logo-text">FashionStore</span>
            </Link>
            <p className="footer-description">
              Discover the latest trends in fashion and accessories. Quality products with fast delivery and excellent customer service.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link">
                <FiFacebook />
              </a>
              <a href="#" className="footer-social-link">
                <FiTwitter />
              </a>
              <a href="#" className="footer-social-link">
                <FiInstagram />
              </a>
              <a href="#" className="footer-social-link">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/products" className="footer-link">All Products</Link></li>
              <li><Link to="/products?category=Men" className="footer-link">Men's Collection</Link></li>
              <li><Link to="/products?category=Women" className="footer-link">Women's Collection</Link></li>
              <li><Link to="/products?category=Accessories" className="footer-link">Accessories</Link></li>
              <li><Link to="/products?category=Shoes" className="footer-link">Shoes</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="footer-heading">Customer Service</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Shipping Information</a></li>
              <li><a href="#" className="footer-link">Returns & Exchanges</a></li>
              <li><a href="#" className="footer-link">Size Guide</a></li>
              <li><a href="#" className="footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="footer-heading">Contact Info</h3>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <FiMapPin />
                <span>123 Fashion St, Style City, SC 12345</span>
              </div>
              <div className="footer-contact-item">
                <FiPhone />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer-contact-item">
                <FiMail />
                <span>support@fashionstore.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h4 className="footer-heading">NEWSLETTER</h4>
              <p className="footer-newsletter-text">
                Subscribe to get special offers and updates
              </p>
              <form className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                  className="footer-newsletter-input"
                />
                <button type="submit" className="footer-newsletter-button">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 FashionStore. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Terms of Service</a>
            <a href="#" className="footer-legal-link">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;