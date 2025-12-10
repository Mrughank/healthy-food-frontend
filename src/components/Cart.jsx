import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

export default function Cart() {
  const { cart, updateQty, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  if (!cart.items || cart.items.length === 0)
    return <h2>Your Cart is Empty</h2>;

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.items.map((item) => (
        <div className="cart-item" key={item.itemId}>
          <img src={item.foodId.foodsimage} className="cart-img" />

          <div className="cart-info">
            <h3>{item.foodId.foodsname}</h3>
            <p>₹{item.foodId.foodsprice}</p>
            <p>Qty: {item.qty}</p>
          </div>

          <div className="cart-actions">
            <button onClick={() => updateQty(item.itemId, "inc")}>+</button>
            <button onClick={() => updateQty(item.itemId, "dec")}>-</button>
            <button onClick={() => removeItem(item.itemId)}>Remove</button>
          </div>
        </div>
      ))}

      <button onClick={clearCart}>Clear Cart</button>
      <button onClick={() => navigate("/placeorder")}>Place Order</button>
    </div>
  );
}
