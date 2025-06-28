import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Shtojmë state për gabimet

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/contact-messages');
        setMessages(res.data);
      } catch (err) {
        console.error('❌ Gabim gjatë marrjes së mesazheve:', err);
        setError('Ndodhi një gabim gjatë marrjes së mesazheve.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading messages...</p>;
  }

  if (error) {
    return <p style={{...styles.loading, color: 'red'}}>{error}</p>;
  }

  if (messages.length === 0) {
    return <p style={styles.empty}>No messages found.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>📨 Contact Messages</h2>
      <ul style={styles.list}>
        {messages.map(msg => (
          <li key={msg.id} style={styles.messageBox}>
            <p style={styles.name}>
              <strong>{msg.name} {msg.lastname}</strong> – <em>{msg.email}</em>
            </p>
            <p style={styles.message}>{msg.message}</p>
            {/* Nëse dëshiron mund të shtosh datën, p.sh: */}
            {/* <p style={styles.date}>{new Date(msg.created_at).toLocaleString()}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    margin: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    marginBottom: '25px',
    color: '#2c3e50',
    fontSize: '26px',
  },
  loading: {
    fontStyle: 'italic',
    color: '#888',
    padding: '20px',
    textAlign: 'center',
  },
  empty: {
    fontStyle: 'italic',
    color: '#999',
    padding: '20px',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  messageBox: {
    marginBottom: '20px',
    padding: '18px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    borderLeft: '4px solid #4c6a92',
  },
  name: {
    fontSize: '16px',
    marginBottom: '8px',
  },
  message: {
    fontSize: '15px',
    color: '#333',
  },
  // date: {
  //   fontSize: '12px',
  //   color: '#666',
  //   marginTop: '6px',
  // }
};

export default ContactMessages;
