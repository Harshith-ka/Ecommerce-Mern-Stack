import React, { useState, useEffect } from "react";
import "./admin.css";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status, trackingNumber = "") => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status, trackingNumber }),
      });

      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page-wrapper">

      <h2 className="page-title">Orders Management</h2>

      <div className="orders-grid">

        {/* Orders List */}
        <div className="orders-list">

          <h3 className="section-title">All Orders</h3>

          <div className="orders-scroll">
            {orders.map((o) => (
              <div
                key={o._id}
                className="order-card"
                onClick={() => setSelectedOrder(o)}
              >
                <div>
                  <p className="order-id">#{o._id.slice(-6).toUpperCase()}</p>
                  <p className="order-user">{o.user?.name}</p>
                  <p className="order-price">${o.totalPrice}</p>
                </div>

                <div className="order-right">
                  <span className={`order-badge ${o.status}`}>{o.status}</span>
                  <span className="order-date">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Order Details */}
        <div className="order-details-box">
          <h3 className="section-title">
            {selectedOrder ? "Order Details" : "Select an Order"}
          </h3>

          {selectedOrder && (
            <div className="order-details-content">

              <div className="detail-block">
                <h4 className="detail-title">Customer Info</h4>
                <p>{selectedOrder.user?.name}</p>
                <p>{selectedOrder.user?.email}</p>
              </div>

              <div className="detail-block">
                <h4 className="detail-title">Shipping Address</h4>
                <p>{selectedOrder.shippingAddress?.street}</p>
                <p>
                  {selectedOrder.shippingAddress?.city},{" "}
                  {selectedOrder.shippingAddress?.state}
                </p>
              </div>

              <div className="detail-block">
                <h4 className="detail-title">Order Status</h4>

                <select
                  className="dropdown"
                  value={selectedOrder.status}
                  onChange={(e) =>
                    updateOrderStatus(selectedOrder._id, e.target.value)
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {selectedOrder.status === "shipped" && (
                <div className="detail-block">
                  <h4 className="detail-title">Tracking Number</h4>

                  <input
                    className="input-field"
                    type="text"
                    value={selectedOrder.trackingNumber || ""}
                    placeholder="Enter tracking number"
                    onChange={(e) =>
                      updateOrderStatus(
                        selectedOrder._id,
                        selectedOrder.status,
                        e.target.value
                      )
                    }
                  />
                </div>
              )}

              <div className="detail-block">
                <h4 className="detail-title">Delivery Progress</h4>

                <div className="tracking-steps">
                  {[
                    { key: "pending", label: "Order Placed" },
                    { key: "confirmed", label: "Confirmed" },
                    { key: "shipped", label: "Shipped" },
                    { key: "delivered", label: "Delivered" },
                  ].map((step) => (
                    <div key={step.key} className="tracking-row">
                      <div
                        className={`tracking-dot ${
                          ["confirmed", "shipped", "delivered"].includes(
                            selectedOrder.status
                          ) || selectedOrder.status === step.key
                            ? "active"
                            : ""
                        }`}
                      />
                      <span>{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default OrdersManagement;
