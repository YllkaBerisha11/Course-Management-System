import React, { useState } from 'react';
import './AboutUs.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const slides = [
    {
      title: "Our Founders",
      text: "The Course Management System was brought to life by three inspiring leaders: Agullina, Fatjona, and Yllka. With a shared passion for education and technology, they joined forces to solve a growing challenge—how to manage courses, professors, and students in a smarter, simpler way. Their collaboration laid the foundation of a platform that continues to evolve every day."
    },
    {
      title: "Our Mission",
      text: "Our mission is to empower educational institutions by providing them with a reliable, user-friendly platform for managing the entire academic process. From course scheduling to student tracking and professor coordination, we aim to streamline operations so educators can focus on what truly matters: teaching and learning. We're here to help schools grow with confidence."
    },
    {
      title: "Our Goal",
      text: "Our goal is to redefine how education is managed in the digital era. We believe in continuous improvement, smart automation, and easy access to all educational tools. By leveraging innovation and feedback from real users, the Course Management System is designed to scale and adapt to schools of every size. Together, we’re building the future of education management—efficient, inclusive, and inspiring."
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="about-us">
      <h2>About Us</h2>
      <p className="intro">
        Welcome to the <strong>Course Management System</strong> — a smart and modern platform built to simplify and enhance education administration. With powerful tools and a clean interface, we're helping schools thrive in the digital world.
      </p>

      <div className="slideshow-container">
        <div className="slide">
          <h3>{slides[currentSlide].title}</h3>
          <p>{slides[currentSlide].text}</p>
        </div>
        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
     <br/>
      {/* Footer Section */}
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

export default AboutUs;
