import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import ProfessorsList from './ProfessorsList';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import CoursesList from './CoursesList';
import Dashboard from './Dashboard';
import PaymentsList from './components/PaymentsList';
import Candidates from './components/Candidates';

// Komponenti për Home
const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero">
        <div className="content">
          <h2>The Best Courses You Will Find Here!</h2>
          <p>Start Learning Today and Unlock Your Full Potential!</p>
          <Link to="/courses" className="btn-main">Get Started</Link>
        </div>
      </div>

      {/* Top Subjects */}
      <section className="top-subjects">
        <h2>Our Top Subjects</h2>
        <div className="subject-container">
          <div className="subject">
            <img src="Images/school.png" alt="subject1" />
            <h3>Mathematics</h3>
          </div>
          <div className="subject">
            <img src="Images/science (1).png" alt="subject2" />
            <h3>Science</h3>
          </div>
          <div className="subject">
            <img src="Images/world-wide-web.png" alt="subject3" />
            <h3>Web Developer</h3>
          </div>
        </div>
      </section>

      {/* Top Courses */}
      <section className="top-courses">
        <h2>Our Top Courses</h2>
        <div className="courses-container">
          <div className="course">
            <img src="Images/pic2.svg" alt="Course 1" />
            <h3>Javascript Frameworks</h3>
          </div>
          <div className="course">
            <img src="Images/pic3.svg" alt="Course 2" />
            <h3>React</h3>
          </div>
          <div className="course">
            <img src="Images/pic4.svg" alt="Course 3" />
            <h3>Web Development</h3>
          </div>
          <div className="course">
            <img src="Images/pic5.svg" alt="Course 4" />
            <h3>Next.js</h3>
          </div>
          <div className="course">
            <img src="Images/pic6.svg" alt="Course 5" />
            <h3>AI</h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-section social-section">
            <h3>CourseManagementSystem</h3>
            <p>Connect with us on social media and stay updated with the latest news, tips, and updates!</p>
            <div className="social-icons">
              <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.twitter.com" className="social-icon" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://www.linkedin.com" className="social-icon" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              <li><Link to="/courses" className="footer-link">Courses</Link></li>
              <li><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Useful Links</h4>
            <ul>
              <li><Link to="#" className="footer-link">Help Center</Link></li>
              <li><Link to="#" className="footer-link">Ask Questions</Link></li>
              <li><Link to="#" className="footer-link">Send Feedback</Link></li>
              <li><Link to="#" className="footer-link">Terms of Use</Link></li>
              <li><Link to="#" className="footer-link">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe for latest updates</p>
            <form action="#">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CourseAYF. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }, []);

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
              <li className="nav-item"><Link to="/" className="nav-links">Home</Link></li>
              <li className="nav-item"><Link to="/about" className="nav-links">About Us</Link></li>
              <li className="nav-item"><Link to="/courses" className="nav-links">Courses</Link></li>
              <li className="nav-item"><Link to="/professors" className="nav-links">Professors</Link></li>
              <li className="nav-item"><Link to="/contact" className="nav-links">Contact Us</Link></li>
              <li className="nav-item"><Link to="/dashboard" className="nav-links">Dashboard</Link></li>
              <li className="nav-item">
                <Link to="/login" className="nav-links login-btn">
                  <i className="fas fa-user-circle"></i> Login
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/professors" element={<ProfessorsList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="payments" element={<PaymentsList />} />
            <Route path="candidates" element={<Candidates />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
