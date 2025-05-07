import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCandidate = ({ candidateId }) => {
  const [candidate, setCandidate] = useState({
    name: '',
    email: '',
    phone: '',
    course_id: '',
  });

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/candidates/${candidateId}`);
        setCandidate(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së kandidatëve:', error);
      }
    };
    fetchCandidate();
  }, [candidateId]);

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
      await axios.put(`http://localhost:3001/api/candidates/${candidateId}`, candidate);
      alert('Kandidati u përditësua me sukses!');
    } catch (error) {
      console.error('Gabim gjatë përditësimit të kandidatit:', error);
    }
  };

  return (
    <div>
      <h2>Përditëso Kandidat</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={candidate.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          value={candidate.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="course_id"
          value={candidate.course_id}
          onChange={handleChange}
        />
        <button type="submit">Përditëso Kandidat</button>
      </form>
    </div>
  );
};

export default EditCandidate;
