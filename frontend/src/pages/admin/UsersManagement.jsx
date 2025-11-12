import React, { useState, useEffect } from "react";
import "./admin.css";

const UsersManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setUsers(data.users);

    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="page-wrapper">

      <h2 className="page-title">Users Management</h2>

      <div className="table-card">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Orders</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="user-row">
                    <div className="user-avatar">
                      {u.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-info">{u.name}</div>
                  </div>
                </td>

                <td>{u.email}</td>

                <td>{new Date(u.createdAt).toLocaleDateString()}</td>

                <td>12</td>

                <td>
                  <span className="status-badge success">Active</span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default UsersManagement;
