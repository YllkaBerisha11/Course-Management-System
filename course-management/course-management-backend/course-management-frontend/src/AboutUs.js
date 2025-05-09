import React, { useState } from 'react';
import './AboutUs.css';

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
    </div>
  );
};

export default AboutUs;
