import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserOrders.css";
import { useAuth } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/userLogin");
    }

   axios.get(`${import.meta.env.VITE_API_URL}/order/userOrders/${user._id}`)

      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, [user, navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "orange";
    }
  };

  return (
    <div className="orders-page">
      <h1>Your Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">No orders placed yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((o) => (
            <div className="order-card" key={o._id}>
              <div className="order-info">
                <h3>{o.foodsname}</h3>
                <p>Qty: {o.qty}</p>
                <p>Price: ₹{o.totalPrice}</p>
                <p>Date: {new Date(o.date).toLocaleDateString()}</p>
              </div>

              <div
                className="order-status"
                style={{ color: getStatusColor(o.status) }}
              >
                {o.status}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
