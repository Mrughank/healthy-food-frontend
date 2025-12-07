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

const placeOrder = async () => {
  if (!token) {
    alert("❌ User NOT logged in");
    return;
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/order/place`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Order placed successfully!");
    clearCart();
    navigate("/");
  } catch (err) {
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
