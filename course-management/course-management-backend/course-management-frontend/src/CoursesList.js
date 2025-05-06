import React from 'react';

const CoursesList = () => {
  const courses = [
    { id: 1, name: 'Course 1', description: 'This is a description for Course 1.' },
    { id: 2, name: 'Course 2', description: 'This is a description for Course 2.' },
    { id: 3, name: 'Course 3', description: 'This is a description for Course 3.' },
  ];

  return (
    <div className="courses-list">
      <h2>Our Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.name}</h3>
            <p>{course.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursesList;
