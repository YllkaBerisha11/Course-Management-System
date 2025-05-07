import React, { useState } from 'react';
import axios from 'axios';

const AddPaymentForm = () => {
  const [formData, setFormData] = useState({
    candidate_id: '',
    amount: '',
    date: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/payments', formData);
      alert('Pagesa u shtua me sukses!');
      setFormData({ candidate_id: '', amount: '', date: '' });
    } catch (error) {
      alert('Gabim gjatë shtimit të pagesës.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Shto Pagesë</h2>
      <input type="number" name="candidate_id" value={formData.candidate_id} onChange={handleChange} placeholder="Candidate ID" required />
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Ruaj</button>
    </form>
  );
};

export default AddPaymentForm;
