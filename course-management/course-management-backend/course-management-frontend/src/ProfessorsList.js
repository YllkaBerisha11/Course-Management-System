import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfessorsList() {
  const [professors, setProfessors] = useState([]);
  
  // Merr të dhënat nga backend-i kur komponenti ngarkohet
  useEffect(() => {
    axios.get('http://localhost:3001/api/professors') // Backend URL
      .then(response => {
        setProfessors(response.data); // Ruaj të dhënat në state
      })
      .catch(error => {
        console.error('Error fetching professors:', error);
      });
  }, []); // Pjesa bosh bën që kjo funksion të ekzekutohet vetëm njëherë kur komponenti ngarkohet

  return (
    <div>
      <h1>Lista e Profesorëve</h1>
      <ul>
        {professors.length > 0 ? (
          professors.map(professor => (
            <li key={professor.id}>
              {professor.name} - {professor.specialty} - {professor.email}
            </li>
          ))
        ) : (
          <p>No professors found.</p>
        )}
      </ul>
    </div>
  );
}

export default ProfessorsList;
