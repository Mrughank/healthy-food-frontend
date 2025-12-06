import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import UserLogin from "./components/UserLogin.jsx";
import UserRegister from "./components/UserRegister.jsx";
import UserOrders from "./components/UserOrders.jsx";
import Contact from "./components/Contact.jsx";
import SellerLogin from "./components/SellerLogin.jsx";
import SellerRegister from "./components/SellerRegister.jsx";
import SellerDashboard from "./components/SellerDashboard.jsx";
import SellerOrders from "./components/SellerOrders.jsx";
import Menu from "./components/Menu.jsx";
import Cart from "./components/Cart.jsx";
import PlaceOrder from "./components/PlaceOrder.jsx";
import OrderSuccess from "./components/OrderSuccess.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Slider from "./components/Slider.jsx";

export default function App() {
  const location = useLocation();

  // Routes where Navbar should be hidden
  const hideNavbarRoutes = ["/sellerDashboard", "/sellerOrders"];

  return (
    <>
      {/* SHOW Navbar only if route is not in hideNavbarRoutes */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/userorders" element={<UserOrders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sellerLogin" element={<SellerLogin />} />
        <Route path="/sellerRegister" element={<SellerRegister />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/sellerOrders" element={<SellerOrders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* ORDER PAGES */}
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/slider" element={<Slider />} />
      </Routes>
    </>
  );
}
