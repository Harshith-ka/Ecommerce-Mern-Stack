import React, { useState, useEffect } from 'react';
import './admin.css';

import AddProductModal from './AddProductModel';
import EditProductModal from './EditProductModel';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      setProducts(data.products);

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      fetchProducts();

    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="page-wrapper">

      <div className="page-header">
        <h2 className="page-title">Products Management</h2>

        <button 
          className="btn-primary" 
          onClick={() => setShowAddModal(true)}
        >
          Add Product
        </button>
      </div>

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Inventory</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="product-row">
                    <img src={p.images[0]?.url} alt={p.name} className="product-img" />
                    <div>
                      <p className="product-name">{p.name}</p>
                      <p className="product-cat">{p.category}</p>
                    </div>
                  </div>
                </td>

                <td>${p.price}</td>

                <td>{p.inventory}</td>

                <td>
                  <span className={`status-badge ${p.inventory > 0 ? "success" : "danger"}`}>
                    {p.inventory > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </td>

                <td>
                  <button 
                    className="table-action edit" 
                    onClick={() => setEditingProduct(p)}
                  >
                    Edit
                  </button>

                  <button 
                    className="table-action delete" 
                    onClick={() => deleteProduct(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {showAddModal && (
        <AddProductModal 
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchProducts();
          }}
        />
      )}

      {editingProduct && (
        <EditProductModal 
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSuccess={() => {
            setEditingProduct(null);
            fetchProducts();
          }}
        />
      )}

    </div>
  );
};

export default ProductsManagement;
