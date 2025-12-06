import React from "react";
import "./AboutUs.css";

// ✅ Import your images
import Salad1 from "../assets/Salad1.jpg";
import Salad2 from "../assets/Salad2.jpg";

export default function AboutUs() {
  return (
    <div className="about-wrapper">

      {/* ✅ SECTION 1 - IMAGE + TEXT */}
      <section className="about-section split-section">

        {/* IMAGE LEFT */}
        <div 
          className="about-img"
          style={{ backgroundImage: `url(${Salad1})` }}
        ></div>

        {/* TEXT RIGHT */}
        <div className="about-text">
          <h1>Give Your Health A Kickstart!</h1>
          <p>
            From fresh salads to refreshing juices and creamy shakes, HealthyFood
            brings you hygienic meals prepared with care. Healthy living made simple,
            delicious, and easy.
          </p>
        </div>

      </section>

      {/* ✅ SECTION 2 - TEXT + IMAGE (REVERSED) */}
      <section className="about-section split-section reverse">

        {/* TEXT LEFT */}
        <div className="about-text">
          <h1>In 30 days, You'll be amazed!</h1>
          <p>
            Experience a healthy transformation—daily fresh, hygienic vegetarian
            meals that fuel your body and mind.
          </p>
        </div>

        {/* IMAGE RIGHT */}
        <div 
          className="about-img"
          style={{ backgroundImage: `url(${Salad2})` }}
        ></div>

      </section>

      {/* ✅ SECTION 3 - MAIN CONTENT */}
      <section className="about-info">
        <h1>Your One-Stop Healthy Store in Ahmedabad</h1>

        <p>
          HealthyFood isn't just a meal service — it's your partner in wellness. We
          offer fresh salads, juices, detox drinks, and hygiene-focused meals. All made
          to order, with no preservatives.
        </p>

        <p>
          Choose from daily, weekly, or custom meal plans — delivered straight to your
          home or office with care and speed.
        </p>
      </section>

    </div>
  );
}
