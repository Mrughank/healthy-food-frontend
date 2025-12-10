import React from "react";
import { useCart } from "./CartContext";
import axios from "axios";
import { useAuth } from "./AuthContext";

export default function PlaceOrder() {
  const { cart } = useCart();
  const { token } = useAuth();

  const total = cart.items.reduce(
    (sum, item) => sum + item.qty * item.foodId.foodsprice,
    0
  );

  const placeOrder = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/order/place`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Order Placed Successfully");
    } catch (err) {
      alert("❌ Order Failed");
    }
  };

  return (
    <div className="placeorder-page">
      <div className="order-box">
        <h2>Your Order</h2>

        {cart.items.map(item => (
          <div key={item.itemId}>
            <h4>{item.foodId.foodsname}</h4>
            <p>₹{item.foodId.foodsprice} × {item.qty}</p>
          </div>
        ))}

        <h3>Total: ₹{total}</h3>
        <button onClick={placeOrder}>Confirm Order</button>
      </div>
    </div>
  );
}
