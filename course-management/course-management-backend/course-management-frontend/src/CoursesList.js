// src/CoursesList.js
import React from "react";
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
  );
}

export default CoursesList;
