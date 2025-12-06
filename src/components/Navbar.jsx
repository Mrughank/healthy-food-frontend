import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import FullLogo from "../assets/FullLogo.jpg";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [open, setOpen] = useState(false);

  const cartCount =
    cart?.items?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  return (
    <nav className="navbar">

      {/* LOGO FIXED */}
      <img src={FullLogo} alt="HealthyFood Logo" className="nav-logo" />

      <h3 className="logom">HealthyFood</h3>


      {/* CENTER MENU */}
      <div className="center-menu">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {user && (
          <Link to="/cart" className="cart-link">
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        )}
      </div>

      {/* RIGHT MENU */}
      <div className="right-menu">
        {user && (
          <>
            <span className="username">{user.username}</span>
            <button className="btn logout" onClick={logout}>Logout</button>
          </>
        )}

        {/* ALWAYS VISIBLE */}
        <Link to="/sellerLogin" className="btn seller-btn">Seller Login</Link>

        {!user && (
          <Link to="/userLogin" className="btn login-btn">User Login</Link>
        )}
      </div>

      {/* HAMBURGER */}
      <div className="hamburger" onClick={() => setOpen(!open)}>☰</div>

      {/* MOBILE DRAWER */}
      <div className={`drawer ${open ? "show" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
        <Link to="/about" onClick={() => setOpen(false)}>About</Link>
        <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>

        {/* ⭐ ADD THIS PART ⭐ */}
        {user && (
          <Link
            to="/cart"
            className="drawer-cart"
            onClick={() => setOpen(false)}
          >
            Cart ({cartCount})
          </Link>
        )}
        {/* ⭐ END ⭐ */}

        {user && (
          <>
            <span className="drawer-username">{user.username}</span>
            <button className="btn logout" onClick={logout}>Logout</button>
          </>
        )}

        {!user && (
          <>
            <Link to="/userLogin" className="btn login-btn">User Login</Link>
          </>
        )}

        {/* ALWAYS VISIBLE */}
        <Link to="/sellerLogin" className="btn seller-btn">Seller Login</Link>
      </div>
    </nav>
  );
}
