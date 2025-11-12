import React, { useState, useEffect } from "react";
import "./admin.css";

const ReviewsManagement = () => {

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/admin/reviews", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setReviews(data.reviews);

    } catch (e) {
      console.error(e);
    }
  };

  const approveReview = async (id) => {
    try {
      await fetch(`/api/admin/reviews/${id}/approve`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ isApproved: true }),
      });

      fetchReviews();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      fetchReviews();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-wrapper">

      <h2 className="page-title">Reviews Management</h2>

      <div className="table-card">

        <table className="table">
          <thead>
            <tr>
              <th>Product & User</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((r) => (
              <tr key={r._id}>
                <td>
                  <p className="review-product">{r.product?.name}</p>
                  <p className="review-user">by {r.user?.name}</p>
                </td>

                <td>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`star ${i < r.rating ? "active" : ""}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </td>

                <td className="review-comment">
                  {r.comment}
                </td>

                <td>
                  <span className={`status-badge ${r.isApproved ? "success" : "pending"}`}>
                    {r.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>

                <td>
                  {!r.isApproved && (
                    <button
                      onClick={() => approveReview(r._id)}
                      className="table-action edit"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => deleteReview(r._id)}
                    className="table-action delete"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default ReviewsManagement;
