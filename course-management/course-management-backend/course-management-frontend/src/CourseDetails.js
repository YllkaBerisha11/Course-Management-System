// src/CourseDetails.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

const courseDetails = {
  1: {
    title: 'Javascript Frameworks',
    image: '/Images/Coding-vs-Programming-5-Key-Differences-To-Remember-landscape-fbbc4b0adbdbc5f29c87e5ad358ce4c9-n5mwvo4a7kez.jpg',
    description: 'Learning JavaScript is not just learning to code; it\'s unlocking endless possibilities in tech.',
    modules: 12,
    hours: 6,
    teacher: 'Jane Smith',
    price: '$59',
    process: '100% online with projects, quizzes, and live support.',
  },
  2: {
    title: 'React',
    image: '/Images/pic16.jpg',
    description: 'In the world of technology, staying ahead means never stopping to learn.',
    modules: 30,
    hours: 10,
    teacher: 'John Doe',
    price: '$79',
    process: 'Recorded lectures + mentor sessions every week.',
  },
  3: {
    title: 'Web Development',
    image: '/Images/pic20.jpg',
    description: 'Web development isn’t just a skill – it’s the foundation of the digital age nowadays.',
    modules: 20,
    hours: 8,
    teacher: 'Emily Johnson',
    price: '$69',
    process: 'Frontend, backend, projects and final exam.',
  },
  4: {
    title: 'Next.js',
    image: '/Images/pic23.png',
    description: 'Create fast, SEO-friendly, and scalable web apps effortlessly with Next.js.',
    modules: 8,
    hours: 3,
    teacher: 'David Lee',
    price: '$49',
    process: 'Short and focused with live coding demos.',
  },
  5: {
    title: 'AI and Machine Learning',
    image: '/Images/pic24.jpg',
    description: 'Empowering innovation through AI and machine learning.',
    modules: 50,
    hours: 30,
    teacher: 'Dr. Sarah Patel',
    price: '$129',
    process: 'Intensive training with datasets and real projects.',
  },
  6: {
    title: 'Algebra and Geometry',
    image: '/Images/pic21.png',
    description: 'Algebra solves equations, geometry measures shapes and space.',
    modules: 35,
    hours: 23,
    teacher: 'Prof. Anna Morales',
    price: '$39',
    process: 'Step-by-step explanations and practice sheets.',
  },
};

function CourseDetails() {
  const { id } = useParams();
  const course = courseDetails[id];
  const navigate = useNavigate();

  if (!course) return <p>Course not found!</p>;

  const handlePayNow = () => {
    navigate('/payment', { state: { course: { ...course, id: Number(id) } } });
  };

  return (
    <div className="course-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Go Back</button>
      <div className="details-container">
        <img src={course.image} alt={course.title} />
        <div className="details-info">
          <h1>{course.title}</h1>
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Modules:</strong> {course.modules}</p>
          <p><strong>Hours:</strong> {course.hours}</p>
          <p><strong>Teacher:</strong> {course.teacher}</p>
          <p><strong>Price:</strong> {course.price}</p>
          <p><strong>Process:</strong> {course.process}</p>

          <button className="pay-now-btn" onClick={handlePayNow}>💳 Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
