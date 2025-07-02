// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser || storedUser.role !== "admin") {
      navigate("/login"); // ridrejto në login nëse nuk është admin
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Po ngarkohet dashboardi...
      </div>
    );
  }

  return (
    <div className="dashboard-container" style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        className="sidebar"
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li style={{ marginBottom: "15px" }}>
              <Link
                to="candidates"
                style={{
                  color: location.pathname.includes("candidates") ? "#38bdf8" : "white",
                  textDecoration: "none",
                }}
              >
                👥 Candidates
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link
                to="professors"
                style={{
                  color: location.pathname.includes("professors") ? "#38bdf8" : "white",
                  textDecoration: "none",
                }}
              >
                🎓 Professors
              </Link>
            </li>
            <li style={{ marginBottom: "15px" }}>
              <Link
                to="contact"
                style={{
                  color: location.pathname.includes("contact") ? "#38bdf8" : "white",
                  textDecoration: "none",
                }}
              >
                📩 Contact Messages
              </Link>
            </li>
            <li>
              <Link
                to="payments"
                style={{
                  color: location.pathname.includes("payments") ? "#38bdf8" : "white",
                  textDecoration: "none",
                }}
              >
                💳 Payments
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main
        className="main-content"
        style={{
          flex: 1,
          padding: "20px",
          background: "#f9fafb",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Welcome, Admin 👋</h1>

        <section style={{ marginBottom: "20px", background: "#fff", padding: "15px", borderRadius: "8px" }}>
          <h2>Dashboard Overview</h2>
          <p>Active Users: <strong>125</strong></p>
          <p>New Messages: <strong>7</strong></p>
          <p>Pending Tasks: <strong>4</strong></p>
          <blockquote style={{ fontStyle: "italic", color: "#555" }}>
            "Success is not final, failure is not fatal: It is the courage to continue that counts."
          </blockquote>
        </section>

        <section className="dashboard-body" style={{ background: "#fff", padding: "15px", borderRadius: "8px" }}>
          {/* Outlet shfaq nën-komponentët e dashboard-it */}
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
