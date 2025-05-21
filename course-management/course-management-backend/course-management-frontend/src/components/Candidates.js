import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    NAME: '',
    email: '',
    phone: '',
    course_id: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchCandidates = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/candidates');
      setCandidates(res.data);
    } catch (err) {
      console.error('Gabim gjatë marrjes së kandidatëve:', err);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { NAME, email, phone, course_id } = formData;
    if (!NAME || !email || !course_id) {
      alert('Ju lutem plotësoni të dhënat!');
      return;
    }

    const dataToSend = {
      NAME,
      email,
      phone: phone || null,
      course_id: parseInt(course_id)
    };

    try {
      if (editingId !== null) {
        await axios.put(`http://localhost:3001/api/candidates/${editingId}`, dataToSend);
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3001/api/candidates', dataToSend);
      }

      setFormData({ NAME: '', email: '', phone: '', course_id: '' });
      fetchCandidates();
    } catch (err) {
      console.error('Gabim gjatë shtimit/përditësimit:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("A jeni i sigurt që doni ta fshini këtë kandidat?")) return;

    try {
      await axios.delete(`http://localhost:3001/api/candidates/${id}`);
      fetchCandidates();
    } catch (err) {
      console.error('Gabim gjatë fshirjes:', err);
    }
  };

  const handleEdit = (candidate) => {
    setFormData({
      NAME: candidate.NAME,
      email: candidate.email,
      phone: candidate.phone || '',
      course_id: candidate.course_id
    });
    setEditingId(candidate.id);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2>{editingId !== null ? 'Përditëso Kandidatin' : 'Shto Kandidat të Ri'}</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
        <input
          type="text"
          name="NAME"
          placeholder="Emri i plotë"
          value={formData.NAME}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email-i"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefoni"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="number"
          name="course_id"
          placeholder="ID e kursit"
          value={formData.course_id}
          onChange={handleChange}
        />
        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px' }}>
          {editingId !== null ? 'Përditëso' : 'Shto'}
        </button>
      </form>

      <h3>Lista e Kandidatëve</h3>
      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Emri</th>
            <th>Email</th>
            <th>Telefoni</th>
            <th>ID Kursit</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.NAME}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.course_id}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edito</button>
                <button onClick={() => handleDelete(c.id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                  Fshi
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Candidates;
