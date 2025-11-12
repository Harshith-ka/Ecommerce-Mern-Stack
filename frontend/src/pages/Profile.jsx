// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { FiUser, FiMail, FiLock, FiShoppingBag, FiHeart, FiStar, FiSave, FiEdit } from 'react-icons/fi';
// import { useAuth } from '../context/AuthContext';
// import '../pages/profile.css';

// const Profile = () => {
//   const { user, updateProfile } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     currentPassword: '',
//     newPassword: '',
//     confirmPassword: '',
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProfile(formData);
//       setIsEditing(false);
//       setFormData(prev => ({
//         ...prev,
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//       }));
//       alert('Profile updated successfully!');
//     } catch (error) {
//       console.error('Profile update error:', error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   return (
//     <div className="profile-page">
//       <div className="profile-container">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="profile-content"
//         >
//           {/* Header */}
//           <div className="profile-header">
//             <div>
//               <h1 className="profile-title">Profile Settings</h1>
//               <p className="profile-subtitle">Manage your account information</p>
//             </div>
//             <button
//               onClick={() => setIsEditing(!isEditing)}
//               className="profile-edit-button"
//             >
//               <FiEdit />
//               <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
//             </button>
//           </div>

//           <div className="profile-content">
//             {/* Sidebar */}
//             <div className="profile-sidebar">
//               <div className="profile-avatar">
//                 <div className="profile-avatar-image">
//                   {user?.name?.charAt(0).toUpperCase()}
//                 </div>
//                 <h2 className="profile-name">{user?.name}</h2>
//                 <p className="profile-email">{user?.email}</p>
//                 <span className="profile-role">{user?.role}</span>
//               </div>
//             </div>

//             {/* Main Content */}
//             <div className="profile-main">
//               <form onSubmit={handleSubmit}>
//                 <div className="profile-section">
//                   <h3 className="profile-section-title">
//                     <FiUser />
//                     Personal Information
//                   </h3>
                  
//                   <div className="profile-form">
//                     <div className="profile-form-grid">
//                       <div className="profile-form-group">
//                         <label className="profile-form-label">Full Name</label>
//                         <input
//                           type="text"
//                           name="name"
//                           value={formData.name}
//                           onChange={handleChange}
//                           disabled={!isEditing}
//                           className="profile-form-input"
//                         />
//                       </div>
                      
//                       <div className="profile-form-group">
//                         <label className="profile-form-label">Email Address</label>
//                         <input
//                           type="email"
//                           name="email"
//                           value={formData.email}
//                           onChange={handleChange}
//                           disabled={!isEditing}
//                           className="profile-form-input"
//                         />
//                       </div>
//                     </div>

//                     {/* Password Change */}
//                     {isEditing && (
//                       <>
//                         <div className="profile-form-group">
//                           <label className="profile-form-label">Current Password</label>
//                           <input
//                             type="password"
//                             name="currentPassword"
//                             value={formData.currentPassword}
//                             onChange={handleChange}
//                             className="profile-form-input"
//                             placeholder="Enter current password"
//                           />
//                         </div>
                        
//                         <div className="profile-form-grid">
//                           <div className="profile-form-group">
//                             <label className="profile-form-label">New Password</label>
//                             <input
//                               type="password"
//                               name="newPassword"
//                               value={formData.newPassword}
//                               onChange={handleChange}
//                               className="profile-form-input"
//                               placeholder="Enter new password"
//                             />
//                           </div>
                          
//                           <div className="profile-form-group">
//                             <label className="profile-form-label">Confirm Password</label>
//                             <input
//                               type="password"
//                               name="confirmPassword"
//                               value={formData.confirmPassword}
//                               onChange={handleChange}
//                               className="profile-form-input"
//                               placeholder="Confirm new password"
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Save Button */}
//                     {isEditing && (
//                       <div className="profile-form-actions">
//                         <button
//                           type="button"
//                           onClick={() => setIsEditing(false)}
//                           className="profile-cancel-button"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           type="submit"
//                           className="profile-save-button"
//                         >
//                           <FiSave />
//                           Save Changes
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </form>

//               {/* Account Statistics */}
//               <div className="profile-stats">
//                 <div className="profile-stat">
//                   <div className="profile-stat-icon orders">
//                     <FiShoppingBag />
//                   </div>
//                   <div className="profile-stat-value">12</div>
//                   <div className="profile-stat-label">Total Orders</div>
//                 </div>
                
//                 <div className="profile-stat">
//                   <div className="profile-stat-icon wishlist">
//                     <FiHeart />
//                   </div>
//                   <div className="profile-stat-value">8</div>
//                   <div className="profile-stat-label">Wishlist Items</div>
//                 </div>
                
//                 <div className="profile-stat">
//                   <div className="profile-stat-icon reviews">
//                     <FiStar />
//                   </div>
//                   <div className="profile-stat-value">5</div>
//                   <div className="profile-stat-label">Reviews</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiLock,
  FiShoppingBag,
  FiHeart,
  FiStar,
  FiSave,
  FiEdit,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../pages/profile.css";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // ✅ REAL USER DATA STATES
  const [orderCount, setOrderCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ✅ FETCH REAL DATA
  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        // ✅ Get Orders
        const orderRes = await axios.get(`/api/orders/user/${user._id}`);
        setOrderCount(orderRes.data.length);

        // ✅ Get Wishlist
        const wishlistRes = await axios.get(`/api/wishlist/${user._id}`);
        setWishlistCount(wishlistRes.data?.items?.length || 0);

        // ✅ Get Reviews (optional)
        const reviewRes = await axios.get(`/api/reviews/user/${user._id}`);
        setReviewCount(reviewRes.data?.length || 0);
      } catch (err) {
        console.log("Profile stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="loading-profile">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-content"
        >
          {/* Header */}
          <div className="profile-header">
            <div>
              <h1 className="profile-title">Profile Settings</h1>
              <p className="profile-subtitle">Manage your account information</p>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="profile-edit-button"
            >
              <FiEdit />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>
          </div>

          <div className="profile-content">
            {/* Sidebar */}
            <div className="profile-sidebar">
              <div className="profile-avatar">
                <div className="profile-avatar-image">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h2 className="profile-name">{user?.name}</h2>
                <p className="profile-email">{user?.email}</p>
                <span className="profile-role">{user?.role}</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="profile-main">
              <form onSubmit={handleSubmit}>
                <div className="profile-section">
                  <h3 className="profile-section-title">
                    <FiUser />
                    Personal Information
                  </h3>

                  <div className="profile-form">
                    <div className="profile-form-grid">
                      <div className="profile-form-group">
                        <label className="profile-form-label">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="profile-form-input"
                        />
                      </div>

                      <div className="profile-form-group">
                        <label className="profile-form-label">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="profile-form-input"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <>
                        <div className="profile-form-group">
                          <label className="profile-form-label">
                            Current Password
                          </label>
                          <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="profile-form-input"
                            placeholder="Enter current password"
                          />
                        </div>

                        <div className="profile-form-grid">
                          <div className="profile-form-group">
                            <label className="profile-form-label">
                              New Password
                            </label>
                            <input
                              type="password"
                              name="newPassword"
                              value={formData.newPassword}
                              onChange={handleChange}
                              className="profile-form-input"
                              placeholder="Enter new password"
                            />
                          </div>

                          <div className="profile-form-group">
                            <label className="profile-form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="profile-form-input"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {isEditing && (
                      <div className="profile-form-actions">
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="profile-cancel-button"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="profile-save-button">
                          <FiSave />
                          Save Changes
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </form>

              {/* ✅ Account Stats (REAL DATA NOW) */}
              <div className="profile-stats">
                <div className="profile-stat">
                  <div className="profile-stat-icon orders">
                    <FiShoppingBag />
                  </div>
                  <div className="profile-stat-value">{orderCount}</div>
                  <div className="profile-stat-label">Total Orders</div>
                </div>

                <div className="profile-stat">
                  <div className="profile-stat-icon wishlist">
                    <FiHeart />
                  </div>
                  <div className="profile-stat-value">{wishlistCount}</div>
                  <div className="profile-stat-label">Wishlist Items</div>
                </div>

                <div className="profile-stat">
                  <div className="profile-stat-icon reviews">
                    <FiStar />
                  </div>
                  <div className="profile-stat-value">{reviewCount}</div>
                  <div className="profile-stat-label">Reviews</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
