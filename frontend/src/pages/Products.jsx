import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFilter, FiGrid, FiList, FiSearch } from 'react-icons/fi';
import axios from 'axios';
import ProductCard from '../components/Products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './product.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const { data } = await axios.get(`/api/products?${params}`);
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const categories = ['Men', 'Women', 'Kids', 'Accessories', 'Shoes'];

  return (
    <div className="products-root">
      <div className="products-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="products-header"
        >
          <h1 className="products-title">All Products</h1>
          <p className="products-subtitle">Discover our amazing collection</p>
        </motion.div>

        <div className="products-main">
          {/* Sidebar Filters */}
          <div className="products-sidebar">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="filters-container"
            >
              <div className="filters-header">
                <h3 className="filters-title">Filters</h3>
                <FiFilter className="filters-icon" />
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <div className="filter-search">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="filter-input"
                  />
                  <FiSearch className="search-icon" />
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="filter-select"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="filter-price-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    className="filter-input"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    className="filter-input"
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="filter-select"
                >
                  <option value="createdAt">Newest</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </motion.div>
          </div>

          {/* Products Grid/List */}
          <div className="products-content">
            {/* View Controls */}
            <div className="view-controls">
              <p className="products-count">
                Showing {products.length} products
              </p>
              <div className="view-mode-btns">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-btn ${viewMode === 'grid' ? 'view-btn-active' : ''}`}
                >
                  <FiGrid className="view-icon" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`view-btn ${viewMode === 'list' ? 'view-btn-active' : ''}`}
                >
                  <FiList className="view-icon" />
                </button>
              </div>
            </div>

            {/* Products */}
            {loading ? (
              <div className="products-loading">
                <LoadingSpinner size="large" />
              </div>
            ) : (
              <motion.div
                layout
                className={viewMode === 'grid' ? 'products-grid' : 'products-list'}
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && products.length === 0 && (
              <div className="products-empty">
                <p className="products-empty-text">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
