import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import '../pages/orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/myorders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="order-status-icon pending" />;
      case 'confirmed':
        return <FiPackage className="order-status-icon confirmed" />;
      case 'shipped':
        return <FiTruck className="order-status-icon shipped" />;
      case 'delivered':
        return <FiCheckCircle className="order-status-icon delivered" />;
      case 'cancelled':
        return <FiXCircle className="order-status-icon cancelled" />;
      default:
        return <FiClock className="order-status-icon pending" />;
    }
  };

  const getStatusBadge = (status) => {
    return `order-status-badge ${status}`;
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <div className="loading-spinner" style={{ margin: '2rem auto' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="orders-content"
        >
          {/* Header */}
          <div className="orders-header">
            <h1 className="orders-title">My Orders</h1>
            <p className="orders-subtitle">Track and manage your orders</p>
          </div>

          {orders.length === 0 ? (
            <div className="orders-empty">
              <div className="orders-empty-icon">
                <FiPackage />
              </div>
              <h2 className="orders-empty-title">No orders yet</h2>
              <p className="orders-empty-description">
                Start shopping to see your orders here
              </p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="order-card"
                >
                  {/* Order Header */}
                  <div className="order-header">
                    <div className="order-info">
                      {getStatusIcon(order.status)}
                      <div className="order-details">
                        <h3>Order #{order._id.slice(-6).toUpperCase()}</h3>
                        <p className="order-meta">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="order-status">
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                      <span className="order-date">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="order-items">
                    {order.orderItems.map((item, itemIndex) => (
                      <div key={itemIndex} className="order-item">
                        <div className="order-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="order-item-details">
                          <h4 className="order-item-name">{item.name}</h4>
                          <div className="order-item-attributes">
                            <span>Qty: {item.quantity}</span>
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                        </div>
                        <div className="order-item-price">
                          <div className="order-item-total">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="order-item-unit">
                            ${item.price} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="order-summary">
                    <div className="order-total">
                      <span className="order-total-label">Total Amount</span>
                      <span className="order-total-value">
                        ${order.totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="order-tracking">
                      <div className="order-tracking-info">
                        {order.trackingNumber ? (
                          <>
                            Tracking: <span className="order-tracking-number">{order.trackingNumber}</span>
                          </>
                        ) : (
                          <span className="order-estimated">
                            Estimated delivery in 3-5 business days
                          </span>
                        )}
                      </div>
                      {order.isDelivered ? (
                        <span className="order-delivery">
                          Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="order-estimated">
                          In transit
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="order-actions">
                    <div className="order-payment-info">
                      <span>Payment: {order.isPaid ? 'Paid' : 'Pending'}</span>
                      {order.paymentMethod && (
                        <span>Method: {order.paymentMethod}</span>
                      )}
                    </div>
                    <div className="order-action-buttons">
                      <button className="order-action-button">
                        View Details
                      </button>
                      <button className="order-action-button">
                        Track Order
                      </button>
                      {order.status === 'delivered' && (
                        <button className="order-action-button">
                          Leave Review
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;