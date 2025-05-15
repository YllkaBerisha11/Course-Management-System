import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentForm = ({ editing, onSubmit }) => {
  const [formData, setFormData] = useState({
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: '',
    payment_status: 'pending'
  });

  useEffect(() => {
    if (editing) {
      setFormData(editing);
    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axios.put(`http://localhost:5000/api/payments/${editing.id}`, formData);
    } else {
      await axios.post('http://localhost:5000/api/payments', formData);
    }
    onSubmit();
    setFormData({ candidate_id: '', course_id: '', payment_amount: '', payment_method: '', payment_status: 'pending' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" name="candidate_id" placeholder="Kandidati" value={formData.candidate_id} onChange={handleChange} required />
      <input type="number" name="course_id" placeholder="Kursi" value={formData.course_id} onChange={handleChange} required />
      <input type="number" name="payment_amount" placeholder="Shuma" value={formData.payment_amount} onChange={handleChange} required />
      <input type="text" name="payment_method" placeholder="Metoda" value={formData.payment_method} onChange={handleChange} required />
      <select name="payment_status" value={formData.payment_status} onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="failed">Failed</option>
      </select>
      <button type="submit">{editing ? 'Ruaj Ndryshimet' : 'Shto Pagesë'}</button>
    </form>
  );
};

export default PaymentForm;
