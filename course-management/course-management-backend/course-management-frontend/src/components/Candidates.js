import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Candidates.css';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course_id: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error('Error fetching candidates:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      alert('Please fill in name and email.');
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:3001/api/candidates/${editingId}`, {
          ...formData,
          course_id: formData.course_id ? parseInt(formData.course_id) : null,
        });
      } else {
        await axios.post('http://localhost:3001/api/candidates', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          course_id: formData.course_id ? parseInt(formData.course_id) : null,
        });
      }

      setFormData({ name: '', email: '', phone: '', course_id: '' });
      setEditingId(null);
      fetchCandidates();
    } catch (err) {
      if (err.response) {
        alert('Server error: ' + JSON.stringify(err.response.data));
      } else {
        alert('Local error: ' + err.message);
      }
    }
  };

  const handleEdit = (candidate) => {
    setFormData({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone || '',
      course_id: candidate.course_id ? String(candidate.course_id) : '',
    });
    setEditingId(candidate.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:3001/api/candidates/${id}`);
        fetchCandidates();
      } catch (err) {
        alert('Error deleting candidate.');
      }
    }
  };

  return (
    <div className="candidate-wrapper">
      <h2>{editingId ? 'Update Candidate' : 'Add Candidate'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="course_id"
          type="number"
          placeholder="Course ID"
          value={formData.course_id}
          onChange={handleChange}
        />
        <button type="submit">
          {editingId ? 'Update' : 'Add'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ name: '', email: '', phone: '', course_id: '' });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h3>Candidates List</h3>
      <ul>
        {candidates.map((c) => (
          <li key={c.id}>
            <div className="candidate-info">
              <strong>{c.name}</strong> | {c.email} | {c.phone || '-'} | Course: {c.course_id || '-'}
            </div>
            <div className="candidate-actions">
              <button className="edit-btn" onClick={() => handleEdit(c)}>✏️</button>
              <button className="delete-btn" onClick={() => handleDelete(c.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Candidates;
