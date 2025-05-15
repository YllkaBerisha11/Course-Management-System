import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddPayment = ({ onAdd, editingPayment, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: '',
    payment_status: 'pending',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingPayment) {
      setFormData({
        candidate_id: editingPayment.candidate_id?.toString() || '',
        course_id: editingPayment.course_id?.toString() || '',
        payment_amount: editingPayment.payment_amount?.toString() || '',
        payment_method: editingPayment.payment_method || '',
        payment_status: editingPayment.payment_status || 'pending',
      });
    } else {
      setFormData({
        candidate_id: '',
        course_id: '',
        payment_amount: '',
        payment_method: '',
        payment_status: 'pending',
      });
    }
  }, [editingPayment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validim minimal
    if (
      !formData.candidate_id.trim() ||
      !formData.course_id.trim() ||
      !formData.payment_amount.trim() ||
      !formData.payment_method.trim()
    ) {
      alert('Ju lutem plotësoni të gjitha fushat.');
      return;
    }

    setLoading(true);

    const payload = {
      candidate_id: Number(formData.candidate_id),
      course_id: Number(formData.course_id),
      payment_amount: Number(formData.payment_amount),
      payment_method: formData.payment_method.trim(),
      payment_status: formData.payment_status,
    };

    try {
      if (editingPayment && editingPayment.id) {
        await axios.put(`http://localhost:5000/payments/${editingPayment.id}`, payload);
        alert('Pagesa u modifikua me sukses!');
      } else {
        await axios.post('http://localhost:5000/payments', payload);
        alert('Pagesa u shtua me sukses!');
      }
      setFormData({
        candidate_id: '',
        course_id: '',
        payment_amount: '',
        payment_method: '',
        payment_status: 'pending',
      });
      if (onAdd) onAdd();
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Gabim gjatë ruajtjes së pagesës:', error.response?.data || error.message || error);
      alert('Gabim gjatë ruajtjes së pagesës. Kontrollo konzolën.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
      <input
        type="number"
        name="candidate_id"
        placeholder="Candidate ID"
        value={formData.candidate_id}
        onChange={handleChange}
        required
        min="1"
        aria-label="Candidate ID"
      />
      <input
        type="number"
        name="course_id"
        placeholder="Course ID"
        value={formData.course_id}
        onChange={handleChange}
        required
        min="1"
        aria-label="Course ID"
      />
      <input
        type="number"
        step="0.01"
        name="payment_amount"
        placeholder="Payment Amount (€)"
        value={formData.payment_amount}
        onChange={handleChange}
        required
        min="0"
        aria-label="Payment Amount"
      />
      <input
        type="text"
        name="payment_method"
        placeholder="Payment Method"
        value={formData.payment_method}
        onChange={handleChange}
        required
        maxLength={50}
        aria-label="Payment Method"
      />
      <select
        name="payment_status"
        value={formData.payment_status}
        onChange={handleChange}
        aria-label="Payment Status"
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit" disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer' }} aria-label={editingPayment ? 'Ruaj Ndryshimet' : 'Shto Pagesë'}>
          {loading ? 'Duke ruajtur...' : editingPayment ? 'Ruaj Ndryshimet' : 'Shto Pagesë'}
        </button>

        {editingPayment && (
          <button
            type="button"
            onClick={() => {
              if (onCancelEdit) onCancelEdit();
            }}
            disabled={loading}
            style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            aria-label="Anulo editimin"
          >
            Anulo
          </button>
        )}
      </div>
    </form>
  );
};

export default AddPayment;
