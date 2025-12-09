import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "./UserLogin.css";

export default function UserLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/login`,
        { username, userpassword }
      );

      const data = res.data;

      if (data.success) {
        login(data.user, data.token);
        alert("✅ Login successful");
        navigate("/menu");
      } else {
        alert(data.msg || "❌ Login failed");
      }
    } catch (err) {
      console.error("Login error:", err?.response?.data || err.message);
      alert(err?.response?.data?.msg || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>User Login</h2>
        <form onSubmit={submit}>
          <input type="text" placeholder="Enter Username"
            value={username} onChange={(e) => setUsername(e.target.value)} required />

          <input type="password" placeholder="Enter Password"
            value={userpassword} onChange={(e) => setUserpassword(e.target.value)} required />

          <button type="submit">{loading ? "Logging in..." : "Login"}</button>
        </form>

        <p>
          Not registered? <a href="/userRegister">Create an Account</a>
        </p>
      </div>
    </div>
  );
}
