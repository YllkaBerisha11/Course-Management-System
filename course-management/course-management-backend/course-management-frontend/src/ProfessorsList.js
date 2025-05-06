// frontend/src/ProfessorsList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfessorsList() {
  const [professors, setProfessors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProfessor, setEditProfessor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newProfessor, setNewProfessor] = useState({
    name: '',
    email: '',
    specialty: '',
    course_id: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/professors')
      .then(response => {
        setProfessors(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching professors!', error);
      });
  }, []);

  const deleteProfessor = (id) => {
    axios.delete(`http://localhost:3001/api/professors/${id}`)
      .then(response => {
        setProfessors(professors.filter(professor => professor.id !== id));
        alert(response.data.message);
      })
      .catch(error => {
        console.error('There was an error deleting the professor!', error);
      });
  };

  const startEdit = (professor) => {
    setIsEditing(true);
    setEditProfessor(professor);
  };

  const updateProfessor = () => {
    axios.put(`http://localhost:3001/api/professors/${editProfessor.id}`, editProfessor)
      .then(response => {
        setProfessors(professors.map(professor => professor.id === editProfessor.id ? editProfessor : professor));
        alert(response.data.message);
        setIsEditing(false);
        setEditProfessor(null);
      })
      .catch(error => {
        console.error('There was an error updating the professor!', error);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProfessor({ ...editProfessor, [name]: value });
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewProfessor({ ...newProfessor, [name]: value });
  };

  const addProfessor = () => {
    axios.post('http://localhost:3001/api/professors', newProfessor)
      .then(response => {
        setProfessors([...professors, { ...newProfessor, id: response.data.id }]);
        alert('Professor added!');
        setIsAdding(false);
        setNewProfessor({ name: '', email: '', specialty: '', course_id: '' });
      })
      .catch(error => {
        console.error('There was an error adding the professor!', error);
      });
  };

  return (
    <div>
      <h2>List of Professors</h2>
      <button onClick={() => setIsAdding(true)}>Add New Professor</button>

      <ul>
        {professors.map(professor => (
          <li key={professor.id}>
            {professor.name} - {professor.email} - {professor.specialty} - Course ID: {professor.course_id}
            <button onClick={() => startEdit(professor)}>Edit</button>
            <button onClick={() => deleteProfessor(professor.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {isAdding && (
        <div className="modal">
          <h3>Add New Professor</h3>
          <input
            type="text"
            name="name"
            value={newProfessor.name}
            onChange={handleAddChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={newProfessor.email}
            onChange={handleAddChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="specialty"
            value={newProfessor.specialty}
            onChange={handleAddChange}
            placeholder="Specialty"
          />
          <input
            type="number"
            name="course_id"
            value={newProfessor.course_id}
            onChange={handleAddChange}
            placeholder="Course ID"
          />
          <button onClick={addProfessor}>Add Professor</button>
          <button onClick={() => setIsAdding(false)}>Cancel</button>
        </div>
      )}

      {isEditing && (
        <div className="modal">
          <h3>Edit Professor</h3>
          <input
            type="text"
            name="name"
            value={editProfessor.name}
            onChange={handleEditChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editProfessor.email}
            onChange={handleEditChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="specialty"
            value={editProfessor.specialty}
            onChange={handleEditChange}
            placeholder="Specialty"
          />
          <input
            type="number"
            name="course_id"
            value={editProfessor.course_id}
            onChange={handleEditChange}
            placeholder="Course ID"
          />
          <button onClick={updateProfessor}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ProfessorsList;
