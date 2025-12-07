import React, { useState } from "react";
import axios from "axios";
import "./SellerRegister.css";
import { useNavigate } from "react-router-dom";

export default function SellerRegister() {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.postaxios.post(`${import.meta.env.VITE_API_URL}/seller/register`, data,
         {
        username,
        userpassword,
      });

      if (res.data.success) {
        alert("Seller Registered ✅");
        navigate("/sellerLogin");
      } else {
        alert("Registration failed ❌");
      }
    } catch (err) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="seller-reg-page">
      <form className="seller-reg-card" onSubmit={onSubmit}>
        <h2>Create Seller Account</h2>

        <input
          type="text"
          placeholder="Seller Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
          required
        />

        <button type="submit" className="reg-btn">Register</button>

        <p className="login-link">
          Already Have Account?{" "}
          <span onClick={() => navigate("/sellerLogin")}>Login</span>
        </p>
      </form>
    </div>
  );
}
