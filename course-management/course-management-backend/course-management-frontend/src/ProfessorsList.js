import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Përdorim axios për kërkesa HTTP

function ProfessorsList() {
  const [professors, setProfessors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfessor, setEditProfessor] = useState(null);

  // Merr të gjithë profesorët nga backend
  useEffect(() => {
    axios.get('http://localhost:3001/api/professors')
      .then(response => {
        setProfessors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching professors!', error);
      });
  }, []);

  // Funksioni për të fshirë një profesor
  const deleteProfessor = (id) => {
    axios.delete(`http://localhost:3001/api/professors/${id}`)
      .then(response => {
        // Pasi profesori është fshirë nga databaza, e heqim edhe nga UI
        setProfessors(professors.filter(professor => professor.id !== id));
        alert(response.data.message); // Mesazh për sukses
      })
      .catch(error => {
        console.error('There was an error deleting the professor!', error);
      });
  };

  // Funksioni për të filluar procesin e përditësimit të profesorëve
  const startEdit = (professor) => {
    setIsEditing(true);
    setEditProfessor(professor);
  };

  // Funksioni për të përditësuar informacionet e një profesori
  const updateProfessor = () => {
    axios.put(`http://localhost:3001/api/professors/${editProfessor.id}`, editProfessor)
      .then(response => {
        setProfessors(professors.map(professor => professor.id === editProfessor.id ? editProfessor : professor));
        alert(response.data.message); // Mesazh për sukses
        setIsEditing(false);
        setEditProfessor(null);
      })
      .catch(error => {
        console.error('There was an error updating the professor!', error);
      });
  };

  // Funksioni për të menaxhuar ndryshimet që bëhen në fushat e formularit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfessor({ ...editProfessor, [name]: value });
  };

  return (
    <div>
      <h2>List of Professors</h2>
      <ul>
        {professors.map(professor => (
          <li key={professor.id}>
            {professor.name} - {professor.email} - {professor.specialty}
            <button onClick={() => startEdit(professor)}>Edit</button>
            <button onClick={() => deleteProfessor(professor.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal për përditësimin e të dhënave të profesorëve */}
      {isEditing && (
        <div className="modal">
          <h3>Edit Professor</h3>
          <input
            type="text"
            name="name"
            value={editProfessor.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editProfessor.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="specialty"
            value={editProfessor.specialty}
            onChange={handleChange}
            placeholder="Specialty"
          />
          <button onClick={updateProfessor}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProfessorsList;
