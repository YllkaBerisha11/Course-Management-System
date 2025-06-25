import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const location = useLocation();

  // Shembull të dhënash statike për dashboard info
  const activeUsers = 125;
  const newMessages = 7;
  const pendingTasks = 4;
  const motivationalQuote = "Success is not final, failure is not fatal: It is the courage to continue that counts.";

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <ul>
            <li className={location.pathname.includes('candidates') ? 'active' : ''}>
              <Link to="candidates">👥 Candidates</Link>
            </li>
            <li className={location.pathname.includes('professors') ? 'active' : ''}>
              <Link to="professors">🎓 Professors</Link>
            </li>
            <li className={location.pathname.includes('contact') ? 'active' : ''}>
              <Link to="contact">📩 Contact Messages</Link>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Welcome, Admin 👋</h1>
        </header>

        {/* Seksioni i ri me info interesante */}
        <section className="dashboard-info" style={{ 
          background: '#f0f4f8', 
          padding: '20px', 
          marginBottom: '20px', 
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h2>Dashboard Overview</h2>
          <p>Active Users: <strong>{activeUsers}</strong></p>
          <p>New Messages: <strong>{newMessages}</strong></p>
          <p>Pending Tasks: <strong>{pendingTasks}</strong></p>
          <blockquote style={{ fontStyle: 'italic', marginTop: '15px', color: '#555' }}>
            "{motivationalQuote}"
          </blockquote>
        </section>

        <section className="dashboard-body">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
