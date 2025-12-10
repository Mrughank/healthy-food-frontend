import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SellerMessages.css";

export default function SellerMessages() {
  const [messages, setMessages] = useState([]);

  const loadMessages = () => {
    axios.get(`${import.meta.env.VITE_API_URL}/contact/all`)
      .then((res) => {
        if (res.data.success) setMessages(res.data.messages);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const deleteMsg = (id) => {
    if (!window.confirm("Delete this message?")) return;

    axios.delete(`${import.meta.env.VITE_API_URL}/contact/delete/${id}`)
      .then(() => loadMessages())
      .catch(() => alert("Delete failed"));
  };

  return (
    <div className="seller-messages-page">
      <div className="msg-header">
        <h2>📩 Customer Messages</h2>
        <button className="refresh-btn" onClick={loadMessages}>🔄 Refresh</button>
      </div>

      {messages.length === 0 ? (
        <p className="empty-msg">No messages yet.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td className="msg-cell">{msg.message}</td>
                <td>{new Date(msg.date).toLocaleString()}</td>
                <td>
                  <button
                    className="delete-msg-btn"
                    onClick={() => deleteMsg(msg._id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
