import React, { useState } from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

export default function PlaceOrder() {
  const { cart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.qty * item.foodId.foodsprice,
      0
    ) || 0;

  const placeOrder = async () => {
    if (cart.items.length === 0) {
      alert("❌ Cart is empty");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order Placed Successfully");

      // ✅ Redirect to Home after success
      navigate("/");

    } catch (err) {
      console.log(err?.response?.data || err);
      alert("❌ Order Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="placeorder-page">
      <div className="order-box">
        <h2>Your Order Summary</h2>

        {cart.items.map((item) => (
          <div className="order-item" key={item.itemId}>
            <h3>{item.foodId.foodsname}</h3>
            <p>Price: ₹{item.foodId.foodsprice}</p>
            <p>Qty: {item.qty}</p>
          </div>
        ))}

        <div className="total-box">Total: ₹{total}</div>

        <button
          className="confirm-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}
