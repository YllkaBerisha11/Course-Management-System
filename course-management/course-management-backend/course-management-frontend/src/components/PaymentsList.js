import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaymentsList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form, setForm] = useState({
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: 'Cash',
    payment_status: 'pending',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/payments');
      setPayments(res.data);
      setError(null);
    } catch (err) {
      setError('Error fetching payments');
      console.error('Fetch payments error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/payments/${id}`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      alert('Error deleting the payment.');
      console.error('Delete payment error:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment);
    setForm({
      candidate_id: payment.candidate_id || '',
      course_id: payment.course_id || '',
      payment_amount: payment.payment_amount || '',
      payment_method: payment.payment_method || 'Cash',
      payment_status: payment.payment_status || 'pending',
    });
  };

  const handleCancelEdit = () => {
    setEditingPayment(null);
    setForm({
      candidate_id: '',
      course_id: '',
      payment_amount: '',
      payment_method: 'Cash',
      payment_status: 'pending',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.candidate_id || !form.course_id || !form.payment_amount) {
      alert('Please fill in all required fields.');
      return;
    }

    const payload = {
      candidate_id: Number(form.candidate_id),
      course_id: Number(form.course_id),
      payment_amount: Number(form.payment_amount),
      payment_method: form.payment_method,
      payment_status: form.payment_status,
    };

    try {
      if (editingPayment) {
        await axios.put(`http://localhost:3001/api/payments/${editingPayment.id}`, payload);
        alert('Payment updated successfully');
      } else {
        await axios.post('http://localhost:3001/api/payments', payload);
        alert('Payment added successfully');
      }
      fetchPayments();
      handleCancelEdit();
    } catch (err) {
      alert('Error submitting the payment');
      console.error('Submit payment error:', err.response?.data || err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      <h2>Payments List</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate ID</th>
            <th>Course ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(payment => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.candidate_id}</td>
              <td>{payment.course_id}</td>
              <td>${Number(payment.payment_amount).toFixed(2)}</td>
              <td>{payment.payment_method}</td>
              <td>{payment.payment_status}</td>
              <td>
                <button onClick={() => handleEditClick(payment)}>Edit</button>{' '}
                <button onClick={() => handleDelete(payment.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>{editingPayment ? 'Edit Payment' : 'Add New Payment'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 400 }}>
        <label>
          Candidate ID:
          <input
            type="number"
            name="candidate_id"
            value={form.candidate_id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Course ID:
          <input
            type="number"
            name="course_id"
            value={form.course_id}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Payment Amount:
          <input
            type="number"
            step="0.01"
            name="payment_amount"
            value={form.payment_amount}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Payment Method:
          <select name="payment_method" value={form.payment_method} onChange={handleInputChange}>
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </label>
        <label>
          Payment Status:
          <select name="payment_status" value={form.payment_status} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <div style={{ marginTop: 16 }}>
          <button type="submit">{editingPayment ? 'Save Changes' : 'Add Payment'}</button>{' '}
          {editingPayment && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>
    </div>
  );
}

export default PaymentsList;
