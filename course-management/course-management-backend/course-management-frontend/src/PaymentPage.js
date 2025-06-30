import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state?.course;

  const [candidateId, setCandidateId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!course) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p>Course data is missing. <br />Please return to the home page.</p>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!candidateId.trim()) {
      setMessage('Please enter the candidate ID.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await axios.post('http://localhost:3001/api/payments', {
        candidate_id: parseInt(candidateId),
        course_id: parseInt(course.id),
        payment_amount: parseFloat(course.price.replace('$', '')),
        payment_method: paymentMethod,
        payment_status: 'pending',
      });

      setMessage('Payment was successfully recorded!');
      setCandidateId('');
      setPaymentMethod('Cash');
    } catch (error) {
      setMessage('Error while registering the payment. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Confirm Payment for Course: {course.title}</h2>
      <p><strong>Price:</strong> {course.price}</p>

      <form onSubmit={handleSubmit}>
        <label>
          Candidate ID:
          <input
            type="number"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            placeholder="Enter candidate ID"
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </label>

        <label style={{ marginTop: '1rem', display: 'block' }}>
          Payment Method:
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            <option value="Cash">Cash</option>
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: '1rem',
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Submitting...' : 'Confirm Payment'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('Error') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default PaymentPage;
