import React, { useState } from "react";
import axios from "axios";
import "./Sellerlogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function SellerLogin() {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  
  const navigate = useNavigate();
  const { loginSeller } = useAuth();

 const handleSellerLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/seller/login`,
      {
        username,
        userpassword,
      }
    );

    if (!res.data.success) {
      alert(res.data.msg || "Invalid login ❌");
      return;
    }

    loginSeller(res.data.seller, res.data.token);
    alert("Seller Login Successful ✅");
    navigate("/sellerDashboard");
  } catch (err) {
    alert("Server Error ❌");
  }
};



  return (
    <div className="seller-login-page">
      <form className="seller-login-card" onSubmit={handleSellerLogin}>
        <h2>Seller Login</h2>

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

        <button type="submit" className="login-btn">Login</button>

        <p className="create-link">
          New Seller?{" "}
          <span onClick={() => navigate("/sellerRegister")}>Create Account</span>
        </p>
      </form>
    </div>
  );
}
