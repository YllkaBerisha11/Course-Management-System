import React, { useEffect, useState } from 'react';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await fetch('http://localhost:5000/api/candidates');
      const data = await response.json();
      setCandidates(data);
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/candidates/${id}`, { method: 'DELETE' });
    if (response.ok) {
      setCandidates(candidates.filter(candidate => candidate.id !== id));
    }
  };

  return (
    <div>
      <h2>List of Candidates</h2>
      <ul>
        {candidates.map((candidate) => (
          <li key={candidate.id}>
            {candidate.name} - {candidate.email} - {candidate.phone} - {candidate.course_title}
            <button onClick={() => handleDelete(candidate.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
