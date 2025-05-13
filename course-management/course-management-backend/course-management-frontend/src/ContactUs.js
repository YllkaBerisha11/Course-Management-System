import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    console.log(formData);
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
      </form>

      {/* Google Map Embed */}
      <div className="map-container">
        <h3>Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2135.632765226207!2d-74.006015!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1f2016fdf9%3A0xe8b607295ac125f8!2sNew%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1631738967687!5m2!1sen!2sin"
          title="Google Map showing company location"
          width="100%"
          height="500"
          style={{ border: 'none', borderRadius: '10px' }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

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
     

export default ContactUs;
