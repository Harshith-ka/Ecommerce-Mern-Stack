import React, { useState, useEffect } from 'react';
import './admin.css';

import { motion } from 'framer-motion';
import { 
  FiPackage, 
  FiUsers, 
  FiDollarSign, 
  FiShoppingCart,
  FiTrendingUp,
  FiSettings,
  FiBarChart2
} from 'react-icons/fi';

import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

import ProductsManagement from './ProductsManagement';
import OrdersManagement from './OrdersManagement';
import UsersManagement from './UsersManagement';
import ReviewsManagement from './ReviewsManagement';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0,
    salesData: [],
    recentOrders: []
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      const data = await response.json();
      setStats(data);

    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: FiShoppingCart,
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: FiPackage,
      change: '+3.1%',
      trend: 'up'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: FiUsers,
      change: '+15.7%',
      trend: 'up'
    },
    {
      title: 'Pending Orders',
      value: stats.pendingOrders.toLocaleString(),
      icon: FiShoppingCart,
      change: '-2.4%',
      trend: 'down'
    },
    {
      title: 'Conversion Rate',
      value: '3.2%',
      icon: FiTrendingUp,
      change: '+1.1%',
      trend: 'up'
    }
  ];

  return (
    <div className="admin-wrapper">

      {/* Sidebar */}
      <div className="admin-sidebar">
        <h1 className="sidebar-title">Admin Panel</h1>

        <nav className="sidebar-nav">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: FiBarChart2 },
            { id: 'products', label: 'Products', icon: FiPackage },
            { id: 'orders', label: 'Orders', icon: FiShoppingCart },
            { id: 'users', label: 'Users', icon: FiUsers },
            { id: 'reviews', label: 'Reviews', icon: FiTrendingUp },
            { id: 'settings', label: 'Settings', icon: FiSettings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`sidebar-btn ${activeTab === item.id ? 'active' : ''}`}
            >
              <item.icon className="sidebar-icon" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="dashboard-body"
          >

            {/* Stats Cards */}
            <div className="stats-grid">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="stat-card"
                >
                  <div>
                    <p className="stat-title">{stat.title}</p>
                    <p className="stat-value">{stat.value}</p>

                    <p className={`stat-change ${stat.trend === 'up' ? 'green' : 'red'}`}>
                      {stat.change} from last month
                    </p>
                  </div>

                  <div className="stat-icon-box">
                    <stat.icon className="stat-icon" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts */}
            <div className="chart-grid">

              <div className="chart-card">
                <h3 className="chart-title">Sales Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stats.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="totalSales" 
                      stroke="#8a63d2" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3 className="chart-title">Orders Overview</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stats.salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="orders" 
                      fill="#82ca9d"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Recent Orders */}
            <div className="recent-orders-card">
              <h3 className="chart-title">Recent Orders</h3>

              {stats.recentOrders.map(order => (
                <div key={order._id} className="recent-order-row">
                  <div>
                    <p className="recent-order-id">
                      #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="recent-order-user">
                      {order.user?.name} - ${order.totalPrice}
                    </p>
                  </div>

                  <div className="recent-order-right">
                    <span className={`order-badge ${order.status}`}>
                      {order.status}
                    </span>

                    <span className="recent-order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </motion.div>
        )}

        {activeTab === 'products' && <ProductsManagement />}
        {activeTab === 'orders' && <OrdersManagement />}
        {activeTab === 'users' && <UsersManagement />}
        {activeTab === 'reviews' && <ReviewsManagement />}
      </div>
    </div>
  );
};

export default AdminDashboard;
