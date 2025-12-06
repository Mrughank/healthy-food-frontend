import React from "react";
import "./Home.css";
import heroVideo from "../assets/Video.mp4";

// ✅ ICONS
import FreshIcon from "../assets/Fress (2).png";
import HygieneIcon from "../assets/Hygines.png";
import ChefIcon from "../assets/Nutritionist.png";
import VegIcon from "../assets/Subscription.png";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home">

      <section className="hero">
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="hero-overlay"></div>

        <div className="hero-inner">
          <h2 className="hero-small-title">Experience the Best Quality</h2>

          <h1 className="hero-main-title">
            Healthy & Delicious Choices
          </h1>

          <p className="hero-desc">
            Refresh your day with HealthyFood — delivering fresh, hygienic vegetarian meals
            crafted by expert chefs, straight to your home with taste, purity & convenience.
          </p>

          {/* ✅ FIXED BUTTON */}
          <Link to="/menu" className="hero-btn">
            Explore Menu
          </Link>
        </div>
      </section>

      {/* ✅ WHAT MAKES US DIFFERENT */}
      <section className="features">

        <h2 className="features-title">What Makes Us Different?</h2>

        <p className="features-subtitle">
          At HealthyFood, we create fresh, hygienic, and chef-crafted vegetarian meals
          prepared daily using high-quality ingredients.
        </p>

        <div className="features-grid">

          <div className="feature-item">
            <div className="feature-circle">
              <img src={FreshIcon} alt="fresh" />
            </div>
            <h3>100% Fresh</h3>
            <p>Delicious and fresh ingredients.</p>
          </div>

          <div className="feature-item">
            <div className="feature-circle">
              <img src={HygieneIcon} alt="hygiene" />
            </div>
            <h3>Hygiene</h3>
            <p>Prepared with high cleanliness standards.</p>
          </div>

          <div className="feature-item">
            <div className="feature-circle">
              <img src={ChefIcon} alt="chef" />
            </div>
            <h3>Expert Chef</h3>
            <p>Meals crafted by professionals.</p>
          </div>

          <div className="feature-item">
            <div className="feature-circle">
              <img src={VegIcon} alt="veg" />
            </div>
            <h3>100% Veg</h3>
            <p>Pure vegetarian, healthy meals.</p>
          </div>

        </div>
      </section>


      {/* ✅ TESTIMONIALS */}
      <section className="testimonials">

        <h2 className="section-title">Testimonials</h2>

        <div className="testimonial-grid">

          <div className="testimonial-card">
            <p>Fresh meals delivered daily. Tasty, quick & hygienic. Highly recommended!</p>
            <h4>- Aarav</h4>
          </div>

          <div className="testimonial-card">
            <p>Best veg food service! Affordable and always fresh.</p>
            <h4>- Priya</h4>
          </div>

          <div className="testimonial-card">
            <p>Excellent quality and fast delivery every time.</p>
            <h4>- Rahul</h4>
          </div>
          <div className="testimonial-card">
            <p>Excellent quality and fast delivery every time.</p>
            <h4>- Mehul</h4>
          </div>
        </div>

      </section>


      {/* ✅ FOOTER LIKE 135 DEGREES */}
      <footer className="site-footer">

        {/* ✅ WAVE BORDER */}
        <div className="footer-wave">
          <svg viewBox="0 0 1440 320">
            <path fill="#faeccf" fillOpacity="1"
              d="M0,288L48,272C96,256,192,224,288,192C384,160,480,128,576,117.3C672,107,768,117,864,149.3C960,181,1056,235,1152,245.3C1248,256,1344,224,1392,208L1440,192V320H0Z">
            </path>
          </svg>
        </div>

        <div className="footer-content">

          <div className="footer-left">
            <h2 className="footer-logo">HealthyFood</h2>
            <p>Fresh, hygienic and professionally crafted meals.</p>
          </div>

          <div className="footer-right">
            <h3>Quick Links</h3>
            <Link to="/">Home</Link>
            <Link to="/menu">Menu</Link>
            <Link to="/contact">Contact</Link>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            Developed with ❤️ by <strong>Mrughank</strong><br />
            © 2025 HealthyFood — All Rights Reserved
          </p>
        </div>


      </footer>

    </div>
  );
}
