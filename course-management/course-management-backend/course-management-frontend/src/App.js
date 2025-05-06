import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Lidh skedarin CSS për stilizimin e aplikacionit

// Importo komponentët për çdo faqe
import ProfessorsList from './ProfessorsList';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import CoursesList from './CoursesList';


// Heqim importimin e CandidatesList pasi nuk është përdorur
// import CandidatesList from './CandidatesList';  <-- E hiqni këtë linjë

// Komponenti kryesor i aplikacionit
function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar-i */}
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
          {/* Nëse vendosni të shtoni CandidatesList, e shtoni këtu */}
          {/* <Route path="/candidates" element={<CandidatesList />} /> */}
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
