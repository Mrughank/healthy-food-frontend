import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, loading, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (loading) return <h2 className="empty-cart">Loading...</h2>;
  if (!cart.items.length) return <h2 className="empty-cart">Your Cart is Empty</h2>;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      {cart.items.map((item) => (
        <div className="cart-item" key={item.itemId}>
          <img
            src={item.foodId?.foodsimage}
            alt={item.foodId?.foodsname}
            className="cart-img"
          />

          <div className="cart-info">
            <h3>{item.foodId?.foodsname}</h3>
            <p>Price: ₹{item.foodId?.foodsprice}</p>
            <p>Qty: {item.qty}</p>
          </div>

          <div className="cart-actions">
            <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
            <button onClick={() => updateQty(item.itemId, "dec")}>-</button>
            <button className="remove-btn" onClick={() => removeItem(item.itemId)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <button className="clear-btn" onClick={clearCart}>Clear Cart</button>

      <button className="placeorder-btn" onClick={() => navigate("/placeorder")}>
        Place Order
      </button>
    </div>
  );
}
