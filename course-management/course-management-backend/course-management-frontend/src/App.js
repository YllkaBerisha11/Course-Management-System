import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

import ProfessorsList from './ProfessorsList';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import CoursesList from './CoursesList';
import Dashboard from './Dashboard';
import CandidatesList from './components/CandidatesList';
import PaymentsList from './components/PaymentsList';
import AddCandidate from './components/AddCandidate';
import EditCandidate from './components/EditCandidate';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              <span>Course Management System</span>
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-links">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-links">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-links">Courses</Link>
              </li>
              <li className="nav-item">
                <Link to="/professors" className="nav-links">Professors</Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-links">Contact Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">Dashboard</Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes për të menaxhuar navigimin mes faqeve */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/professors" element={<ProfessorsList />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Dashboard route që përfshin subroutes për Candidates dhe Payments */}
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="candidates" element={<CandidatesList />} />
            <Route path="add" element={<AddCandidate />} />
            <Route path="edit/:id" element={<EditCandidate />} />
            <Route path="payments" element={<PaymentsList />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// Komponenti për Home
const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to the Course Management System</h2>
      <p>Manage your courses, professors, candidates, and more...</p>
    </div>
  );
};

export default App;
