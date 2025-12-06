import React from "react";
import "./Slider.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function Slider() {
  const navigate = useNavigate();
  const { user, seller } = useAuth();

  const getWelcomeText = () => {
    if (seller) return `Welcome Seller, ${seller.username}`;
    if (user) return `Welcome, ${user.username}`;
    return "Welcome to HealthyFood";
  };

  return (
    <div className="slider">
      <div className="slider-content">
        <h1>{getWelcomeText()}</h1>
        <p>Healthy food delivered fresh and fast.</p>
        <button className="menu-btn" onClick={() => navigate("/menu")}>
          Order Now
        </button>
      </div>
    </div>
  );
}
