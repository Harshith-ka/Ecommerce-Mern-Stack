import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTruck, FiShield, FiHeart, FiStar } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/Products/ProductCard';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import '../pages/Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await axios.get('/api/products/featured/featured');
      setFeaturedProducts(data);
    } catch (error) {
      console.error('Error fetching featured products:', error);

      // fallback data
      setFeaturedProducts([
        {
          _id: '1',
          name: "Classic White T-Shirt",
          price: 29.99,
          originalPrice: 39.99,
          images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500" }],
          category: "Men",
          rating: 4.5,
          numReviews: 24,
          description: "Premium quality cotton t-shirt for everyday wear."
        },
        {
          _id: '2',
          name: "Summer Floral Dress",
          price: 59.99,
          originalPrice: 79.99,
          images: [{ url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500" }],
          category: "Women",
          rating: 4.8,
          numReviews: 36,
          description: "Beautiful floral pattern dress perfect for summer occasions."
        },
        {
          _id: '3',
          name: "Designer Handbag",
          price: 129.99,
          images: [{ url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" }],
          category: "Accessories",
          rating: 4.7,
          numReviews: 18,
          description: "Luxurious leather handbag with multiple compartments."
        },
        {
          _id: '4',
          name: "Sports Running Shoes",
          price: 89.99,
          originalPrice: 119.99,
          images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }],
          category: "Shoes",
          rating: 4.6,
          numReviews: 42,
          description: "High-performance running shoes with cushion technology."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: "Men's Fashion",
      image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500",
      count: "120+ Products",
      link: "/products?category=Men"
    },
    {
      name: "Women's Fashion",
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500",
      count: "150+ Products",
      link: "/products?category=Women"
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500",
      count: "80+ Products",
      link: "/products?category=Accessories"
    },
    {
      name: "Footwear",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
      count: "60+ Products",
      link: "/products?category=Shoes"
    }
  ];

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1 className="hero-title">
              Summer Fashion
              <span className="hero-title-accent">Collection 2024</span>
            </h1>
            <div className="hero-floating-circle"></div>
<div className="hero-floating-square"></div>
            <p className="hero-subtitle">
              Discover the latest trends in clothing and accessories
            </p>

            <div className="hero-actions">
              <Link to="/products" className="hero-button hero-button-primary">
                Shop Now <FiArrowRight />
              </Link>
              <Link to="/products?category=Men" className="hero-button hero-button-secondary">
                Explore Men's
              </Link>
              <Link to="/products?category=Women" className="hero-button hero-button-secondary">
                Explore Women's
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="features-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="features-grid"
          >
            <div className="feature-card">
              <div className="feature-icon feature-icon-shipping"><FiTruck /></div>
              <h3 className="feature-title">Free Shipping</h3>
              <p className="feature-description">Free delivery on all orders over $50.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-payment"><FiShield /></div>
              <h3 className="feature-title">Secure Payment</h3>
              <p className="feature-description">100 percent secure and encrypted payments.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon feature-icon-support"><FiHeart /></div>
              <h3 className="feature-title">24/7 Support</h3>
              <p className="feature-description">Our support team is available 24/7.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <div className="featured-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="featured-header"
          >
            <h2 className="featured-title">Featured Products</h2>
            <p className="featured-subtitle">Discover our most popular and trending items</p>
          </motion.div>

          {loading ? (
            <div className="featured-loading">
              <LoadingSpinner size="large" />
            </div>
          ) : (
            <motion.div layout className="featured-grid">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="featured-actions"
          >
            <Link to="/products" className="btn btn-primary">
              View All Products <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ✅ TRENDING THIS WEEK (NEW SECTION) */}
      <section className="trending-section">
        <div className="section-header">
          <h2>Trending This Week</h2>
          <p>Most viewed and purchased items this week</p>
        </div>

        <div className="trending-carousel">
          {featuredProducts.slice(0, 10).map((product) => (
            <div className="trending-item" key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="categories-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="categories-header"
          >
            <h2 className="categories-title">Shop by Category</h2>
            <p className="categories-subtitle">Find exactly what you're looking for</p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link to={category.link} className="category-card">
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-overlay">
                    <h3 className="category-name">{category.name}</h3>
                    <p className="category-count">{category.count}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✅ WHY SHOP WITH US */}
      <section className="why-section">
        <div className="section-header">
          <h2>Why Shop With Us</h2>
          <p>We deliver value, quality, and trust</p>
        </div>

        <div className="why-grid">
          <div className="why-card">
            <img src="/icons/authentic.png" alt="" />
            <h3>100 Percent Authentic</h3>
            <p>Premium quality and verified original products.</p>
          </div>

          <div className="why-card">
            <img src="/icons/support.png" alt="" />
            <h3>24/7 Support</h3>
            <p>We are here to help anytime you need.</p>
          </div>

          <div className="why-card">
            <img src="/icons/returns.png" alt="" />
            <h3>Easy Returns</h3>
            <p>Hassle-free 7 day return & exchange policy.</p>
          </div>

          <div className="why-card">
            <img src="/icons/secure.png" alt="" />
            <h3>Secure Payments</h3>
            <p>Safe & encrypted payments for worry-free shopping.</p>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="newsletter">
        <div className="newsletter-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="newsletter-content"
          >
            <h2 className="newsletter-title">Stay Updated</h2>
            <p className="newsletter-description">
              Subscribe to our newsletter and get exclusive deals and fashion tips
            </p>
            <form className="newsletter-form">
              <input type="email" placeholder="Enter your email address" className="newsletter-input" required />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FiArrowRight, FiTruck, FiShield, FiHeart, FiStar } from 'react-icons/fi';
// import axios from 'axios';
// import ProductCard from '../components/Products/ProductCard';
// import LoadingSpinner from '../components/common/LoadingSpinner';
// import './Home.css';

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   show: (i = 0) => ({
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
//   })
// };

// const Home = () => {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchFeaturedProducts();
//   }, []);

//   const fetchFeaturedProducts = async () => {
//     try {
//       const { data } = await axios.get('/api/products/featured/featured');
//       setFeaturedProducts(data);
//     } catch (error) {
//       console.error('Error fetching featured products:', error);
//       // Fallback data
//       setFeaturedProducts([
//         {
//           _id: '1',
//           name: "Classic White T-Shirt",
//           price: 29.99,
//           originalPrice: 39.99,
//           images: [{ url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80" }],
//           category: "Men",
//           rating: 4.5,
//           numReviews: 24,
//           inventory: 50,
//           description: "Premium quality cotton t-shirt for everyday wear."
//         },
//         {
//           _id: '2',
//           name: "Summer Floral Dress",
//           price: 59.99,
//           originalPrice: 79.99,
//           images: [{ url: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=900&q=80" }],
//           category: "Women",
//           rating: 4.8,
//           numReviews: 36,
//           inventory: 30,
//           description: "Beautiful floral pattern dress perfect for summer occasions."
//         },
//         {
//           _id: '3',
//           name: "Designer Handbag",
//           price: 129.99,
//           images: [{ url: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&q=80" }],
//           category: "Accessories",
//           rating: 4.7,
//           numReviews: 18,
//           inventory: 20,
//           description: "Luxurious leather handbag with multiple compartments."
//         },
//         {
//           _id: '4',
//           name: "Sports Running Shoes",
//           price: 89.99,
//           originalPrice: 119.99,
//           images: [{ url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80" }],
//           category: "Shoes",
//           rating: 4.6,
//           numReviews: 42,
//           inventory: 40,
//           description: "High-performance running shoes with cushion technology."
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const categories = [
//     {
//       name: "Men's Fashion",
//       image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&q=80",
//       count: "120+ Products",
//       link: "/products?category=Men"
//     },
//     {
//       name: "Women's Fashion",
//       image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=80",
//       count: "150+ Products",
//       link: "/products?category=Women"
//     },
//     {
//       name: "Accessories",
//       image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80",
//       count: "80+ Products",
//       link: "/products?category=Accessories"
//     },
//     {
//       name: "Footwear",
//       image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80",
//       count: "60+ Products",
//       link: "/products?category=Shoes"
//     }
//   ];

//   return (
//     <div className="home">

//       {/* ===== Hero (Full Screen) ===== */}
//       <section className="hero hero--full">
//         <div className="hero-bg" />
//         <div className="hero-container">
//           <motion.div
//             initial="hidden"
//             animate="show"
//             className="hero-inner"
//           >
//             <motion.span variants={fadeUp} className="pill pill--light">New Season • Up to 40% Off</motion.span>
//             <motion.h1 variants={fadeUp} className="hero-title">
//               Style meets <span className="hero-title-accent">Performance</span>
//             </motion.h1>
//             <motion.p variants={fadeUp} className="hero-subtitle">
//               Clothing & electronic accessories curated for your lifestyle. Shop trusted brands with fast delivery.
//             </motion.p>

//             <motion.div variants={fadeUp} className="hero-actions">
//               <Link to="/products" className="hero-button hero-button-primary">
//                 Shop Now <FiArrowRight />
//               </Link>
//               <Link to="/products?category=Men" className="hero-button hero-button-secondary">Men</Link>
//               <Link to="/products?category=Women" className="hero-button hero-button-secondary">Women</Link>
//             </motion.div>
//           </motion.div>

//           {/* floating badges */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.6 }}
//             className="float-badge fb-1"
//           >
//             <FiTruck /> Free Shipping
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="float-badge fb-2"
//           >
//             <FiShield /> Secure Payment
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.0 }}
//             className="float-badge fb-3"
//           >
//             <FiHeart /> 24/7 Support
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== Featured Banner (NEW) ===== */}
//       <section className="featured-banner">
//         <div className="featured-banner__content">
//           <div className="fb-left">
//             <h3>Festive Mega Sale</h3>
//             <p>Extra 15% off on clothing & gadgets. Limited time!</p>
//             <Link to="/products" className="fb-cta">Grab Deals <FiArrowRight /></Link>
//           </div>
//           <div className="fb-right">
//             <div className="fb-tile fb-clothing">
//               <span>Clothing</span>
//               <Link to="/products?category=Men">Explore</Link>
//             </div>
//             <div className="fb-tile fb-electronics">
//               <span>Electronics</span>
//               <Link to="/products?category=Accessories">Explore</Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ===== Features ===== */}
//       <section className="features section-tight">
//         <div className="features-container">
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true, amount: 0.2 }}
//             className="features-grid"
//           >
//             {[
//               { icon: <FiTruck />, title: 'Free Shipping', desc: 'On all orders over $50' },
//               { icon: <FiShield />, title: 'Secure Payment', desc: '100% encrypted checkout' },
//               { icon: <FiHeart />, title: '24/7 Support', desc: 'We’re here for you, always' }
//             ].map((f, i) => (
//               <motion.div variants={fadeUp} custom={i} className="feature-card" key={f.title}>
//                 <div className={`feature-icon feature-icon-${i}`}>
//                   {f.icon}
//                 </div>
//                 <h3 className="feature-title">{f.title}</h3>
//                 <p className="feature-description">{f.desc}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== Featured Products ===== */}
//       <section className="featured-products section-tight">
//         <div className="featured-container">
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="featured-header"
//           >
//             <motion.h2 variants={fadeUp} className="featured-title">Featured Products</motion.h2>
//             <motion.p variants={fadeUp} className="featured-subtitle">
//               Discover our most popular and trending items
//             </motion.p>
//           </motion.div>

//           {loading ? (
//             <div className="featured-loading">
//               <LoadingSpinner size="large" />
//             </div>
//           ) : (
//             <motion.div layout className="featured-grid">
//               {featuredProducts.map((product, index) => (
//                 <motion.div
//                   key={product._id}
//                   initial={{ opacity: 0, y: 16 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: index * 0.05 }}
//                 >
//                   <ProductCard product={product} />
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             viewport={{ once: true }}
//             className="featured-actions"
//           >
//             <Link to="/products" className="btn btn-primary">
//               View All Products <FiArrowRight />
//             </Link>
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== Trending (compact slider) ===== */}
//       <section className="trending-section section-tight">
//         <div className="section-header">
//           <h2>Trending This Week</h2>
//           <p>Most viewed & purchased items</p>
//         </div>
//         <div className="trending-carousel">
//           {featuredProducts.slice(0, 10).map((product) => (
//             <div className="trending-item" key={product._id}>
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ===== Categories ===== */}
//       <section className="categories section-tight">
//         <div className="categories-container">
//           <motion.div
//             initial="hidden"
//             whileInView="show"
//             viewport={{ once: true }}
//             className="categories-header"
//           >
//             <motion.h2 variants={fadeUp} className="categories-title">Shop by Category</motion.h2>
//             <motion.p variants={fadeUp} className="categories-subtitle">Find exactly what you're looking for</motion.p>
//           </motion.div>

//           <div className="categories-grid">
//             {categories.map((category, index) => (
//               <motion.div
//                 key={category.name}
//                 initial={{ opacity: 0, scale: 0.96 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: index * 0.06 }}
//                 viewport={{ once: true }}
//               >
//                 <Link to={category.link} className="category-card">
//                   <img src={category.image} alt={category.name} className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">{category.name}</h3>
//                     <p className="category-count">{category.count}</p>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ===== Why Shop With Us ===== */}
//       <section className="why-section section-tight">
//         <div className="section-header">
//           <h2>Why Shop With Us</h2>
//           <p>We deliver value, quality, and trust</p>
//         </div>

//         <div className="why-grid">
//           <div className="why-card">
//             <img src="/icons/authentic.png" alt="" />
//             <h3>100% Authentic</h3>
//             <p>Premium quality and verified original products.</p>
//           </div>

//           <div className="why-card">
//             <img src="/icons/support.png" alt="" />
//             <h3>24/7 Support</h3>
//             <p>We are here to help anytime you need.</p>
//           </div>

//           <div className="why-card">
//             <img src="/icons/returns.png" alt="" />
//             <h3>Easy Returns</h3>
//             <p>Hassle-free 7 day return & exchange policy.</p>
//           </div>

//           <div className="why-card">
//             <img src="/icons/secure.png" alt="" />
//             <h3>Secure Payments</h3>
//             <p>Safe & encrypted payments for worry-free shopping.</p>
//           </div>
//         </div>
//       </section>

//       {/* ===== Newsletter ===== */}
//       <section className="newsletter section-tight">
//         <div className="newsletter-container">
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="newsletter-content"
//           >
//             <h2 className="newsletter-title">Stay Updated</h2>
//             <p className="newsletter-description">
//               Subscribe to our newsletter and get exclusive deals and fashion tips
//             </p>
//             <form className="newsletter-form" onSubmit={(e)=>e.preventDefault()}>
//               <input
//                 type="email"
//                 placeholder="Enter your email address"
//                 className="newsletter-input"
//                 required
//               />
//               <button type="submit" className="newsletter-button">
//                 Subscribe
//               </button>
//             </form>
//           </motion.div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;
