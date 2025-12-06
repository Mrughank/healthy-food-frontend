import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import "./SellerOrders.css";

export default function SellerOrders() {
  const { seller, sellerToken } = useAuth();  // include sellerToken
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!seller) return;

    axios
      .get(`http://localhost:9000/order/seller/${seller._id}`, {
        headers: {
          Authorization: `Bearer ${sellerToken}`
        }
      })
      .then((res) => {
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      })
      .catch((err) => {
        console.log("SellerOrders error:", err.response?.data || err);
      });
  }, [seller]);

  return (
    <div className="seller-orders-page">
      <h2>Seller Orders</h2>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Buyer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map(order =>
              order.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.foodId?.foodsname}</td>
                  <td>{order.username}</td>
                  <td>₹{order.total}</td>
                  <td>{order.status}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      )}
    </div>
  );
}
