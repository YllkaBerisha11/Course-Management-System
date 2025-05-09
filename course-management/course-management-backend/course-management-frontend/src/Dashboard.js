import React from 'react';
import './Dashboard.css';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="candidates">Candidates</Link>
          </li>
          <li>
            <Link to="payments">Payments</Link>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />  {/* Këtu do të shfaqen sub-rutat */}
      </div>
    </div>
  );
};

export default Dashboard;
