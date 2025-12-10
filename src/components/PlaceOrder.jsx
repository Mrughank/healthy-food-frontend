import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";

export default function PlaceOrder() {
  const { cart, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.qty * item.foodId.foodsprice,
      0
    ) || 0;

  const placeOrder = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order Placed Successfully");
      clearCart();          // ✅ clear cart after order
      navigate("/");        // ✅ redirect to HOME

    } catch (err) {
      console.log(err);
      alert("❌ Order Failed");
    }
  };

  return (
    <div className="placeorder-page">
      <div className="order-box">
        <h2>Your Order</h2>

        {cart.items?.map((item) => (
          <div className="order-item" key={item.itemId}>
            <h3>{item.foodId.foodsname}</h3>
            <p>₹{item.foodId.foodsprice} × {item.qty}</p>
          </div>
        ))}

        <h3 className="total-box">Total: ₹{total}</h3>

        <button className="confirm-btn" onClick={placeOrder}>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
