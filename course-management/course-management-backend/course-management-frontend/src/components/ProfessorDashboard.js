import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfessorDashboard.css';

function ProfessorDashboard() {
  const [professors, setProfessors] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '' });
  const [editId, setEditId] = useState(null);

  const fetchProfessors = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/professors');
      setProfessors(res.data);
    } catch (err) {
      console.error('Error fetching professors:', err.message);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`http://localhost:3001/api/professors/${editId}`, form);
      } else {
        await axios.post('http://localhost:3001/api/professors', form);
      }
      setForm({ name: '', email: '', subject: '' });
      setEditId(null);
      fetchProfessors();
    } catch (err) {
      console.error('Error submitting form:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/professors/${id}`);
      fetchProfessors();
    } catch (err) {
      console.error('Error deleting professor:', err.message);
    }
  };

  const handleEdit = (prof) => {
    setForm({ name: prof.name, email: prof.email, subject: prof.subject });
    setEditId(prof.id);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Professor</h2>

      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Subject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Professors List</h3>
      <ul>
        {professors.map((prof) => (
          <li key={prof.id} className="mb-2">
            <span className="font-medium">{prof.name}</span> | {prof.email} | {prof.subject}
            <button className="ml-2 text-yellow-600" onClick={() => handleEdit(prof)}>✏️</button>
            <button className="ml-2 text-red-600" onClick={() => handleDelete(prof.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfessorDashboard;
