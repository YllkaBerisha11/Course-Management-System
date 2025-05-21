import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    // Merr të gjithë kandidatët nga API
    axios.get('http://localhost:3001/api/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Gabim gjatë marrjes së kandidatëve:', error);
      });
  }, []);

  return (
    <div>
      <h3>List of Candidates</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course ID</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.course_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesList;
