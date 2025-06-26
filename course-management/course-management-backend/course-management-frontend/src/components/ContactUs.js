import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit button clicked', formData);

    if (!formData.name || !formData.lastname || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/contact-messages', {  // vendos URL absolute me port
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Message sent successfully! Thank you for contacting us.');
        setFormData({ name: '', lastname: '', email: '', message: '' });
      } else {
        const data = await response.json();
        alert(`Failed to send message: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert('An error occurred while sending your message. Please try again.');
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            id="lastname"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            rows={5}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>

      {/* Google Map Embed */}
      <div className="map-container" style={{ marginTop: '40px' }}>
        <h3>Our Location</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2135.632765226207!2d-74.006015!3d40.712776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1f2016fdf9%3A0xe8b607295ac125f8!2sNew%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sin!4v1631738967687!5m2!1sen!2sin"
          title="Google Map showing company location"
          width="100%"
          height="500"
          style={{ border: 'none', borderRadius: '10px' }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ContactUs;
