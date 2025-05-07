// src/components/AddCandidateForm.js
import React, { useState } from 'react';

const AddCandidateForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [course_id, setCourseId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const candidateData = { name, email, phone, course_id };

    const response = await fetch('http://localhost:5000/api/candidates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(candidateData)
    });

    const result = await response.json();
    if (response.status === 201) {
      alert('Kandidati u shtua me sukses!');
      setName('');
      setEmail('');
      setPhone('');
      setCourseId('');
    } else {
      alert('Ka ndodhur një gabim gjatë shtimit të kandidatit');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Emri:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Telefoni:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div>
        <label>ID Kursi:</label>
        <input type="text" value={course_id} onChange={(e) => setCourseId(e.target.value)} required />
      </div>
      <button type="submit">Shto Kandidat</button>
    </form>
  );
};

export default AddCandidateForm;
