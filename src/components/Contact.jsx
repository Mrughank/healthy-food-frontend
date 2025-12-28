import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!name || !email || !message) {
      setStatus({ type: "error", text: "Please fill all fields." });
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus({ type: "error", text: "Invalid email address." });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact/add`,    // ✅ ONLY CHANGE
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", text: "Message sent successfully!" });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: data.error || "Something went wrong" });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Network error, try later." });
    }

    setLoading(false);
  };
  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>

      <div className="contact-wrapper">

        <div className="contact-left">
          <h2>Get in touch</h2>
          <p>Prefer email? Write to:</p>
          <strong>yourname@example.com</strong>
          <p>We respond within 24–48 hours.</p>
        </div>

        <div className="contact-right">
          <h2>Send a message</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <textarea
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <div className={`status-box ${status.type}`}>
              {status.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
