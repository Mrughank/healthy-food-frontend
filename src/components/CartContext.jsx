import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  // ✅ FETCH CART
  const fetchCart = async () => {
    if (!token) {
      setCart({ items: [] });
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.cart || { items: [] });
    } catch (err) {
      console.log("fetch cart error:", err?.response?.data || err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // ✅ ADD TO CART
  const addToCart = async (foodId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart/add`,
        { foodId, qty: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.log("addToCart error:", err?.response?.data || err);
    }
  };

  // ✅ UPDATE QTY
  const updateQty = async (itemId, type) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/cart/update/${itemId}`,
        { type },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.log("updateQty error:", err?.response?.data || err);
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (itemId) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/remove/${itemId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.log("removeItem error:", err?.response?.data || err);
    }
  };

  // ✅ CLEAR CART
  const clearCart = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(res.data.cart);
    } catch (err) {
      console.log("clearCart error:", err?.response?.data || err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
