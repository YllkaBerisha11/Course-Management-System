import React, { useState } from 'react';
import axios from 'axios';

function AddPaymentForm() {
  const [formData, setFormData] = useState({
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: 'kesh',
    payment_status: 'pending'
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/payments/add', formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert("Gabim gjatë shtimit të pagesës.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="candidate_id" placeholder="Kandidati ID" onChange={handleChange} />
      <input name="course_id" placeholder="Kursi ID" onChange={handleChange} />
      <input name="payment_amount" placeholder="Shuma" onChange={handleChange} />
      <input name="payment_method" placeholder="Metoda" onChange={handleChange} />
      <select name="payment_status" onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
      </select>
      <button type="submit">Shto</button>
    </form>
  );
}

export default AddPaymentForm;
