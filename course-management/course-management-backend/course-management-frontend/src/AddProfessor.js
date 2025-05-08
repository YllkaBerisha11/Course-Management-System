import React, { useState } from 'react';

const AddProfessor = () => {
  const [professor, setProfessor] = useState({
    name: '',
    email: '',
    specialty: '',
    course_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor({
      ...professor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/professors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Profesor i shtuar me sukses: ' + data.name);
      } else {
        alert('Gabim gjatë shtimit të profesorit');
      }
    } catch (error) {
      console.error('Ka ndodhur një gabim:', error);
      alert('Gabim gjatë lidhjes me serverin');
    }
  };

  return (
    <div>
      <h3>Shto Profesor</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Emri i Profesorit"
          value={professor.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Emaili i Profesorit"
          value={professor.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="specialty"
          placeholder="Specializimi"
          value={professor.specialty}
          onChange={handleChange}
        />
        <input
          type="number"
          name="course_id"
          placeholder="ID e Kursit"
          value={professor.course_id}
          onChange={handleChange}
        />
        <button type="submit">Shto Profesor</button>
      </form>
    </div>
  );
};

export default AddProfessor;
