// src/CoursesList.js
import React from "react";
import { Link } from "react-router-dom";
import "./CoursesList.css"; // Shtoje këtë nëse ke stilizime

const courses = [
  {
    category: "IT",
    image: "/Images/Coding-vs-Programming-5-Key-Differences-To-Remember-landscape-fbbc4b0adbdbc5f29c87e5ad358ce4c9-n5mwvo4a7kez.jpg",
    title: "Javascript Frameworks",
    description: "Learning JavaScript is not just learning to code; it's unlocking endless possibilities in tech.",
    modules: 12,
    hours: 6,
  },
  {
    category: "IT",
    image: "/Images/pic16.jpg",
    title: "React",
    description: "In the world of technology, staying ahead means never stopping to learn.",
    modules: 30,
    hours: 10,
  },
  {
    category: "IT",
    image: "/Images/pic20.jpg",
    title: "Web Development",
    description: "Web development isn’t just a skill – it’s the foundation of the digital age nowadays.",
    modules: 20,
    hours: 8,
  },
  {
    category: "IT",
    image: "/Images/pic23.png",
    title: "Next.js",
    description: "Create fast, SEO-friendly, and scalable web apps effortlessly with Next.js.",
    modules: 8,
    hours: 3,
  },
  {
    category: "IT",
    image: "/Images/pic24.jpg",
    title: "AI and Machine Learning",
    description: "Empowering innovation through AI and machine learning, transforming ideas into intelligent solutions.",
    modules: 50,
    hours: 30,
  },
  {
    category: "Mathematics",
    image: "/Images/pic21.png",
    title: "Algebra and Geometry",
    description: "Algebra helps us solve equations, while geometry focuses on the properties and measurements of shapes, angles.",
    modules: 35,
    hours: 23,
  },
];

function CoursesList() {
  return (
    <>
      <section className="courses">
        <h1>Our Famous Courses</h1>

        <div className="course-container">
          {courses.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-category">{course.category}</div>
              <img src={course.image} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button className="read-more" onClick={() => alert('Read more functionality is under construction.')}>
                Read More
              </button>
              <div className="course-details">
                <span>{course.modules} modules</span>
                <span>{course.hours} hours</span>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more-container">
          <button className="load-more" onClick={() => alert('Load more functionality is under construction.')}>
            Load More
          </button>
        </div>
      </section>
      <br/>
      {/* Footer në fund të faqes, pa ndryshuar background-in */}
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
    </>
  );
}

export default CoursesList;
