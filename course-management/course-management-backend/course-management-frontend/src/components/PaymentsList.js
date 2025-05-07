import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: '',
    payment_status: 'pending',
  });

  const [editPayment, setEditPayment] = useState({
    id: '',
    candidate_id: '',
    course_id: '',
    payment_amount: '',
    payment_method: '',
    payment_status: '',
  });

  // Merr pagesat nga backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së pagesave:', error);
      }
    };
    fetchPayments();
  }, []);

  // Shto një pagesë të re
  const addPayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/payments', newPayment);
      setPayments([...payments, response.data]);
      setNewPayment({ candidate_id: '', course_id: '', payment_amount: '', payment_method: '', payment_status: 'pending' });
    } catch (error) {
      console.error('Gabim gjatë shtimit të pagesës:', error);
    }
  };

  // Përditëso një pagesë
  const updatePayment = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/api/payments/${editPayment.id}`, editPayment);
      setPayments(payments.map(payment => payment.id === editPayment.id ? response.data : payment));
      setEditPayment({ id: '', candidate_id: '', course_id: '', payment_amount: '', payment_method: '', payment_status: '' });
    } catch (error) {
      console.error('Gabim gjatë përditësimit të pagesës:', error);
    }
  };

  // Fshi një pagesë
  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/payments/${id}`);
      setPayments(payments.filter(payment => payment.id !== id));
    } catch (error) {
      console.error('Gabim gjatë fshirjes së pagesës:', error);
    }
  };

  return (
    <div>
      <h2>Lista e Pagesave</h2>
      {/* Formulari për shtimin e pagesës */}
      <div>
        <h3>Shto Pagesë të Re</h3>
        <input
          type="text"
          placeholder="Kandidati ID"
          value={newPayment.candidate_id}
          onChange={(e) => setNewPayment({ ...newPayment, candidate_id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kursi ID"
          value={newPayment.course_id}
          onChange={(e) => setNewPayment({ ...newPayment, course_id: e.target.value })}
        />
        <input
          type="number"
          placeholder="Shuma"
          value={newPayment.payment_amount}
          onChange={(e) => setNewPayment({ ...newPayment, payment_amount: e.target.value })}
        />
        <input
          type="text"
          placeholder="Metoda e Pagesës"
          value={newPayment.payment_method}
          onChange={(e) => setNewPayment({ ...newPayment, payment_method: e.target.value })}
        />
        <button onClick={addPayment}>Shto Pagesë</button>
      </div>

      {/* Formulari për përditësimin e pagesës */}
      {editPayment.id && (
        <div>
          <h3>Përditëso Pagesën</h3>
          <input
            type="text"
            placeholder="Kandidati ID"
            value={editPayment.candidate_id}
            onChange={(e) => setEditPayment({ ...editPayment, candidate_id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Kursi ID"
            value={editPayment.course_id}
            onChange={(e) => setEditPayment({ ...editPayment, course_id: e.target.value })}
          />
          <input
            type="number"
            placeholder="Shuma"
            value={editPayment.payment_amount}
            onChange={(e) => setEditPayment({ ...editPayment, payment_amount: e.target.value })}
          />
          <input
            type="text"
            placeholder="Metoda e Pagesës"
            value={editPayment.payment_method}
            onChange={(e) => setEditPayment({ ...editPayment, payment_method: e.target.value })}
          />
          <button onClick={updatePayment}>Përditëso Pagesën</button>
        </div>
      )}

      {/* Lista e pagesave */}
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            Kandidati: {payment.candidate_id} | Kursi: {payment.course_id} | Shuma: {payment.payment_amount} | Metoda: {payment.payment_method}
            <button onClick={() => setEditPayment(payment)}>Përditëso</button>
            <button onClick={() => deletePayment(payment.id)}>Fshi</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsList;
