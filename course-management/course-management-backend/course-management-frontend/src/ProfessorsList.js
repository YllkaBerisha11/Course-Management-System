import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfessorsList.css';

const ProfessorList = () => {
  const [professors, setProfessors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/professors');
        setProfessors(res.data);
      } catch (err) {
        console.error('Error fetching professors:', err.message);
      }
    };
    fetchProfessors();
  }, []);

  const filtered = professors.filter((prof) => {
    const search = searchTerm.toLowerCase();
    return (
      prof.NAME.toLowerCase().includes(search) ||
      prof.title.toLowerCase().includes(search) ||
      prof.SUBJECT.toLowerCase().includes(search)
    );
  });

  return (
    <div className="professor-container">
      <h1 className="title-main">Our Professors</h1>

      <input
        type="text"
        placeholder="Search by name, title, or subject..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="professor-list">
        {filtered.map((prof, index) => (
          <div key={index} className="professor-card">
            <img
              src={prof.image || 'https://via.placeholder.com/100'}
              alt={prof.NAME}
              className="prof-img"
            />
            <h3>{prof.NAME}</h3>
            <p className="title">{prof.title}</p>
            <p><strong>Subject:</strong> {prof.SUBJECT}</p>
            <p><strong>Email:</strong> <a href={`mailto:${prof.email}`}>{prof.email}</a></p>
            <p><strong>Phone:</strong> {prof.phone}</p>
            <p><strong>Office:</strong> {prof.office}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorList;
