import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentsList.css';

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
      setError('Gabim gjatë marrjes së pagesave');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('A jeni të sigurt që doni ta fshini këtë pagesë?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/payments/${id}`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      alert('Gabim gjatë fshirjes së pagesës.');
    }
  };

  const handleInputChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleEditClick = (payment) => {
    setEditingPayment(payment);
    setForm({
      candidate_id: payment.candidate_id,
      course_id: payment.course_id,
      payment_amount: payment.payment_amount,
      payment_method: payment.payment_method,
      payment_status: payment.payment_status,
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
    try {
      if (editingPayment) {
        // Update payment
        await axios.put(`http://localhost:3001/api/payments/${editingPayment.id}`, form);
        alert('Pagesa u përditësua me sukses');
      } else {
        // Add new payment
        await axios.post('http://localhost:3001/api/payments', form);
        alert('Pagesa u shtua me sukses');
      }
      fetchPayments();
      handleCancelEdit();
    } catch (err) {
      alert('Gabim gjatë regjistrimit të pagesës');
    }
  };

  if (loading) return <p>Po ngarkohet...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2>Lista e Pagesave</h2>
      <table border="1" cellPadding="8" style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate ID</th>
            <th>Course ID</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th>Veprime</th>
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
                <button onClick={() => handleEditClick(payment)}>Ndrysho</button>{' '}
                <button onClick={() => handleDelete(payment.id)}>Fshi</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '2rem' }}>{editingPayment ? 'Ndrysho Pagesën' : 'Shto Pagesë të Re'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px' }}>
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
          <select
            name="payment_method"
            value={form.payment_method}
            onChange={handleInputChange}
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </label>
        <label>
          Payment Status:
          <select
            name="payment_status"
            value={form.payment_status}
            onChange={handleInputChange}
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <div style={{ marginTop: '1rem' }}>
          <button type="submit">{editingPayment ? 'Ruaj Ndryshimet' : 'Shto Pagesë'}</button>{' '}
          {editingPayment && <button type="button" onClick={handleCancelEdit}>Anulo</button>}
        </div>
      </form>
    </div>
  );
}

export default PaymentsList;
