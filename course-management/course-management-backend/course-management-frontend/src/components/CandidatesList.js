import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Gabim gjatë marrjes së kandidatëve:', error);
      }
    };
    fetchCandidates();
  }, []);

  return (
    <div>
      <h2>Lista e Kandidatëve</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.email} - {candidate.phone} - Kursi ID: {candidate.course_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
