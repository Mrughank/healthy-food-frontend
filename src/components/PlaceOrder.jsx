import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

export default function PlaceOrder() {
  const { cart, clearCart, fetchCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.qty * (item.foodId?.foodsprice || 0),
      0
    ) || 0;

  const placeOrder = async () => {
  console.log("TOKEN FOUND:", token);

  if (!token) {
    alert("❌ User NOT logged in — token missing");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:9000/order/place",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("ORDER RESPONSE:", res.data);
    alert("Order placed successfully!");
    clearCart();
    navigate("/");

  } catch (err) {
    console.log("ORDER ERROR:", err.response?.data || err);
    alert(err.response?.data?.msg || "Order failed");
  }
};


  return (
    <div className="placeorder-page">
      <div className="order-box">
        <h2>Your Order Summary</h2>

        {cart.items?.map((item) => (
          <div className="order-item" key={item._id}>
            <h3>{item.foodId?.foodsname}</h3>
            <p>Price: ₹{item.foodId?.foodsprice}</p>
            <p>Qty: {item.qty}</p>
          </div>
        ))}

        <div className="total-box">Total: ₹{total}</div>

        <button className="confirm-btn" onClick={placeOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
