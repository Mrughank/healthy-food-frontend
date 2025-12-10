import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    if (!token) return setCart({ items: [] });

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/cart`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCart(res.data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const addToCart = async (foodId) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/cart/add`,
      { foodId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  const updateQty = async (itemId, type) => {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/cart/update/${itemId}`,
      { type },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  const removeItem = async (itemId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/cart/remove/${itemId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart(res.data.cart);
  };

  const clearCart = async () => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/cart/clear`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
