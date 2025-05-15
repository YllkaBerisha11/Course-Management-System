import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddPayment from './AddPayment';
import './PaymentsList.css';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [editingPayment, setEditingPayment] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setError('');
      const res = await axios.get('http://localhost:5000/payments');
      setPayments(res.data);
      console.log('Pagesat u ngarkuan:', res.data);
    } catch (err) {
      console.error('Gabim gjatë marrjes së pagesave:', err);
      setError('Gabim gjatë marrjes së pagesave. Kontrollo backend-in.');
    }
  };

  const handleDelete = async (id) => {
    console.log('Fshi:', id);
    const confirmDelete = window.confirm('A je i sigurt që dëshiron të fshish këtë pagesë?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/payments/${id}`);
      fetchPayments();
    } catch (err) {
      console.error('Gabim gjatë fshirjes së pagesës:', err);
      alert('Gabim gjatë fshirjes së pagesës.');
    }
  };

  const handleEdit = (payment) => {
    console.log('Edito:', payment);
    setEditingPayment(payment);
  };

  const cancelEdit = () => {
    setEditingPayment(null);
  };

  // Kjo funksion thirret pasi të shtohet ose të përditësohet një pagesë
  const onAddOrUpdate = () => {
    fetchPayments();
    cancelEdit();
  };

  return (
    <div className="container">
      <h2>Menaxhimi i Pagesave</h2>

      <AddPayment
        onAdd={onAddOrUpdate}
        editingPayment={editingPayment}
        onCancelEdit={cancelEdit}
      />

      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Candidate ID</th>
            <th>Course ID</th>
            <th>Shuma</th>
            <th>Mënyra</th>
            <th>Statusi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {payments.length > 0 ? (
            payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.candidate_id}</td>
                <td>{p.course_id}</td>
                <td>{p.payment_amount?.toLocaleString()} €</td>
                <td>{p.payment_method}</td>
                <td>{p.payment_status}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Edito</button>{' '}
                  <button onClick={() => handleDelete(p.id)}>Fshij</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">
                Nuk ka pagesa të regjistruara.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsList;
