import React, { useState } from 'react';
import axios from 'axios';

const AddCandidate = () => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    course_id: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/candidates', candidate);
      alert('Kandidati u shtua me sukses!');
    } catch (error) {
      console.error('Gabim gjatë shtimit të kandidatit:', error);
    }
  };

  return (
    <div>
      <h2>Shto Kandidat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Emri"
          value={candidate.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={candidate.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefoni"
          value={candidate.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="course_id"
          placeholder="ID i Kursit"
          value={candidate.course_id}
          onChange={handleChange}
        />
        <button type="submit">Shto Kandidat</button>
      </form>
    </div>
  );
};

export default AddCandidate;
