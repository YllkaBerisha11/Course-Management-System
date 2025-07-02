// src/App.js
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Login from "./components/login";
import Register from "./components/register";
import ProfessorsList from "./ProfessorsList";
import AboutUs from "./AboutUs";
import ContactUs from "./components/ContactUs";
import CoursesList from "./CoursesList";
import CourseDetails from "./CourseDetails";
import Dashboard from "./Dashboard";
import PaymentsList from './components/PaymentsList.jsx';
import Candidates from "./components/Candidates";
import ContactMessages from "./components/ContactMessages";
import PaymentPage from "./PaymentPage";
import ProfessorDashboard from "./components/ProfessorDashboard";
import Logout from "./components/Logout";

// Komponent i mbrojtur për admina
const ProtectedRoute = ({ user, children }) => {
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const NotFound = () => (
  <div style={{ padding: 40, textAlign: "center" }}>
    <h2>404 - Page Not Found</h2>
    <Link to="/">Go back Home</Link>
  </div>
);

const HeroSection = () => (
  <div className="hero">
    <div className="content">
      <h2>The Best Courses You Will Find Here!</h2>
      <p>Start Learning Today and Unlock Your Full Potential!</p>
      <Link to="/courses" className="btn-main">
        Get Started
      </Link>
    </div>
  </div>
);

const TopSubjects = () => (
  <section className="top-subjects">
    <h2>Our Top Subjects</h2>
    <div className="subject-container">
      <div className="subject">
        <img src="/Images/school.png" alt="Mathematics" />
        <h3>Mathematics</h3>
      </div>
      <div className="subject">
        <img src="/Images/microscope_947477.png" alt="Science" />
        <h3>Science</h3>
      </div>
      <div className="subject">
        <img src="/Images/world-wide-web.png" alt="Web Developer" />
        <h3>Web Developer</h3>
      </div>
    </div>
  </section>
);

const TopCourses = () => (
  <section className="top-courses">
    <h2>Our Top Courses</h2>
    <div className="courses-container">
      <div className="course">
        <img src="/Images/pic2.svg" alt="Javascript Frameworks" />
        <h3>Javascript Frameworks</h3>
      </div>
      <div className="course">
        <img src="/Images/pic3.svg" alt="React" />
        <h3>React</h3>
      </div>
      <div className="course">
        <img src="/Images/pic4.svg" alt="Web Development" />
        <h3>Web Development</h3>
      </div>
      <div className="course">
        <img src="/Images/pic5.svg" alt="Next.js" />
        <h3>Next.js</h3>
      </div>
      <div className="course">
        <img src="/Images/pic6.svg" alt="AI" />
        <h3>AI</h3>
      </div>
    </div>
  </section>
);

// Footer komponent (mund ta nxjerrësh në fajl të veçantë ./components/Footer.js)
const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing!");
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section social-section">
          <h3>CourseManagementSystem</h3>
          <p>Connect with us on social media and stay updated!</p>
          <div className="social-icons">
            <a href="https://www.facebook.com" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.instagram.com" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Useful Links</h4>
          <ul>
            <li>
              <Link to="#">Help Center</Link>
            </li>
            <li>
              <Link to="#">Ask Questions</Link>
            </li>
            <li>
              <Link to="#">Send Feedback</Link>
            </li>
            <li>
              <Link to="#">Terms of Use</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Newsletter</h4>
          <form onSubmit={handleSubscribe}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CourseAYF. All rights reserved.</p>
      </div>
    </footer>
  );
};

const Home = () => (
  <div className="home">
    <HeroSection />
    <TopSubjects />
    <TopCourses />
    <Footer />
  </div>
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo">
              Course Management System
            </Link>
            <ul className="nav-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/professors">Professors</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              {user?.role === "admin" && (
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              )}
              {user ? (
                <li>
                  <Link to="/logout">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login">
                    <i className="fas fa-user-circle"></i> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/professors" element={<ProfessorsList />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/logout" element={<Logout onLogout={() => setUser(null)} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Dashboard protected */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="payments" element={<PaymentsList />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="contact" element={<ContactMessages />} />
            <Route path="professors" element={<ProfessorDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
