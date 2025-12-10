  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import "./SellerDashboard.css";
  import { useAuth } from "./AuthContext.jsx";
  import { useNavigate } from "react-router-dom";

  export default function SellerDashboard() {
    const { seller, logout } = useAuth();
    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);
    const [form, setForm] = useState({
      foodsname: "",
      foodsprice: "",
      foodsimage: "",
    });

    const [editItem, setEditItem] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      if (!seller) {
        navigate("/sellerLogin");
        return;
      }

      loadFoods();
      loadMessages();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [seller]);

    // ---------- FOODS ----------
    const loadFoods = () => {
      axios.get(`${import.meta.env.VITE_API_URL}/seller/food/list/${seller._id}`)
        .then((res) => {
          const data = res.data?.foods || res.data || [];
          setFoods(Array.isArray(data) ? data : []);
        })
        .catch((err) => {
          console.error("loadFoods err:", err);
          alert("Failed to load foods");
        });
    };

    const addFood = (e) => {
      e.preventDefault();
      if (!form.foodsname || !form.foodsprice) {
        alert("Please enter name and price");
        return;
      }

      axios.post(`${import.meta.env.VITE_API_URL}/seller/food/add`, {
        ...form,
        sellerId: seller._id,
      })
        .then(() => {
          loadFoods();
          setForm({ foodsname: "", foodsprice: "", foodsimage: "" });
        })
        .catch((err) => {
          console.error("addFood err:", err);
          alert("Failed to add food");
        });
    };

    const deleteFood = (id) => {
      if (!window.confirm("Delete this food?")) return;
      axios.delete(`${import.meta.env.VITE_API_URL}/seller/food/delete/${id}`)
        .then(() => loadFoods())
        .catch((err) => {
          console.error("deleteFood err:", err);
          alert("Failed to delete item");
        });
    };

    const updateFood = () => {
      if (!editItem) return;
      axios.put(
        `${import.meta.env.VITE_API_URL}/seller/food/update/${editItem._id}`,
        editItem
      )

        .then(() => {
          loadFoods();
          setEditItem(null);
        })
        .catch((err) => {
          console.error("updateFood err:", err);
          alert("Update failed");
        });
    };

    // ---------- MESSAGES ----------
    const loadMessages = () => {
      axios.get(`${import.meta.env.VITE_API_URL}/contact/all`)

        .then((res) => {
          const msgs = res.data?.messages || res.data || [];
          setMessages(Array.isArray(msgs) ? msgs : []);
        })
        .catch((err) => {
          console.error("loadMessages err:", err);
        });
    };

    const clearMessagesLocal = () => setMessages([]);

    return (
      <div className="seller-main-container">
        {/* SIDEBAR */}
        <div className="seller-sidebar">
          <h2 className="side-title">👤 {seller?.username || "Seller"}</h2>

          <ul className="side-menu">
            <li><a href="#dashboard">🏠 Dashboard</a></li>
            <li><a href="#addfood">➕ Add Food</a></li>
            <li><a href="#foods">🍽 Food Items</a></li>
            <li><a href="#messages">📩 Messages</a></li>
            <li className="clickable" onClick={() => navigate("/sellerOrders")}>
              📦 Seller Orders
            </li>
          </ul>

          <button
            className="logout-btn"
            onClick={() => {
              logout();
              navigate("/sellerLogin");
            }}
          >
            🔓 Logout
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="seller-dashboard-content">
          <h1 id="dashboard">Seller Dashboard</h1>

          {/* ADD FOOD */}
          <form id="addfood" className="add-food-box" onSubmit={addFood}>
            <h2>Add New Food Item</h2>

            <input
              type="text"
              placeholder="Food Name"
              value={form.foodsname}
              onChange={(e) => setForm({ ...form, foodsname: e.target.value })}
            />

            <input
              type="number"
              placeholder="Food Price"
              value={form.foodsprice}
              onChange={(e) => setForm({ ...form, foodsprice: e.target.value })}
            />

            <input
              type="text"
              placeholder="Food Image URL"
              value={form.foodsimage}
              onChange={(e) => setForm({ ...form, foodsimage: e.target.value })}
            />

            <button type="submit">Add Food</button>
          </form>

          {/* FOOD LIST */}
          <div id="foods" className="food-list">
            <h2>Your Food Items</h2>

            {foods.length === 0 ? (
              <p>No food items yet.</p>
            ) : (
              <div className="food-grid">
                {foods.map((f) => (
                  <div className="food-card" key={f._id}>
                    <div className="food-img-wrap">
                      {f.foodsimage ? (
                        <img src={f.foodsimage} alt={f.foodsname} />
                      ) : (
                        <div className="placeholder">No image</div>
                      )}
                    </div>

                    <h3>{f.foodsname}</h3>
                    <p>₹{f.foodsprice}</p>

                    <div className="card-actions">
                      <button className="edit-btn" onClick={() => setEditItem(f)}>✏ Edit</button>
                      <button className="delete-btn" onClick={() => deleteFood(f._id)}>🗑 Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* MESSAGES */}
          <div id="messages" className="messages-section">
            <div className="messages-header">
              <h2>Customer Messages</h2>
              <div className="msg-actions">
                <button onClick={loadMessages}>🔄 Refresh</button>
                <button onClick={clearMessagesLocal}>🧹 Clear (local)</button>
              </div>
            </div>

            {messages.length === 0 ? (
              <p>No messages yet.</p>
            ) : (
              <table className="msg-table">
                <thead>
                  <tr>
                    <th style={{ width: "18%" }}>Name</th>
                    <th style={{ width: "22%" }}>Email</th>
                    <th>Message</th>
                    <th style={{ width: "18%" }}>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {messages.map((m) => (
                    <tr key={m._id}>
                      <td>{m.name}</td>
                      <td>{m.email}</td>
                      <td className="msg-cell">{m.message}</td>
                      <td>{new Date(m.date).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* EDIT MODAL */}
          {editItem && (
            <div className="edit-modal">
              <div className="edit-box">
                <h2>Edit Food</h2>

                <input
                  type="text"
                  value={editItem.foodsname}
                  onChange={(e) =>
                    setEditItem({ ...editItem, foodsname: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={editItem.foodsprice}
                  onChange={(e) =>
                    setEditItem({ ...editItem, foodsprice: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={editItem.foodsimage}
                  onChange={(e) =>
                    setEditItem({ ...editItem, foodsimage: e.target.value })
                  }
                />

                <div className="edit-actions">
                  <button className="save-btn" onClick={updateFood}>✅ Save</button>
                  <button className="cancel-btn" onClick={() => setEditItem(null)}>❌ Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
