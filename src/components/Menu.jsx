import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/seller/food/all`)

      .then((res) => setFoods(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleAdd = async (item) => {
    if (!user) return navigate("/userlogin");

    const result = await addToCart(item._id);
    if (result.success) alert("Added to cart!");
  };

  return (
    <div className="menu-page">
      <h2 className="menu-title">Healthy Menu</h2>

      <div className="menu-list">
        {foods.map((item) => (
          <div key={item._id} className="food-card">
            <img src={item.foodsimage} alt="" />
            <h3>{item.foodsname}</h3>
            <p>₹{item.foodsprice}</p>

            <button onClick={() => handleAdd(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
