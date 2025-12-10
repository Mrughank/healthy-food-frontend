import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "./PlaceOrder.css";

export default function PlaceOrder() {
  const { cart } = useCart();
  const { token } = useAuth();

  const total =
    cart.items?.reduce(
      (sum, item) => sum + item.qty * item.foodId?.foodsprice,
      0
    ) || 0;

  const placeOrder = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order placed successfully!");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("❌ Order failed");
    }
  };

  return (
    <div className="placeorder-page">
      <div className="order-box">
        <h2>Your Order Summary</h2>

        {cart.items?.map((item) => (
          <div className="order-item" key={item.itemId}>
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
