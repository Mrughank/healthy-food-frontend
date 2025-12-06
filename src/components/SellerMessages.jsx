import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerMessages.css";

export default function SellerMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9000/contact/all")
      .then((res) => {
        if (res.data.success) {
          setMessages(res.data.messages);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="seller-messages-page">
      <h2>Customer Messages</h2>

      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>{new Date(msg.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
