import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./UserRegister.css";

export default function UserRegister() {
  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = axios.post(`${VITE_API_URL}/user/signup`, {
        name: username,
        password: userpassword,
        email,
        phone: mobile,
      });


      if (res.data.success) {
        alert("✅ Registration successful!");
        navigate("/userLogin");
      } else {
        alert("❌ " + res.data.msg);
      }
    } catch (err) {
      console.log("Register error:", err.response?.data || err);
      alert("⚠️ Server error");
    }
  };


  return (
    <div className="register-container">
      <form className="register-card" onSubmit={handleSubmit}>
        <h2>User Register</h2>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={userpassword}
          onChange={(e) => setUserpassword(e.target.value)}
          required
        />

        <button type="submit" className="register-btn">Register</button>

        <p>
          Already have an account? <Link to="/userLogin">Login</Link>
        </p>
      </form>
    </div>
  );
}
