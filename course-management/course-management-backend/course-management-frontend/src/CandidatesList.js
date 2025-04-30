import React, { useEffect, useState } from 'react';

function CandidatesList() {
  const [candidates, setCandidates] = useState([]); // Shto state për kandidatët

  useEffect(() => {
    // Përdor fetch për të marrë kandidatët nga API
    fetch('http://localhost:3001/api/candidates')
      .then((response) => response.json())
      .then((data) => {
        console.log('Candidates data:', data); // Verifiko të dhënat që po marrim
        setCandidates(data);
      })
      .catch((error) => console.error('Error fetching candidates:', error));
  }, []); // Efecti ekzekutohet vetëm një herë kur komponenti ngarkon

  return (
    <div>
      <h2>Candidates List</h2>
      {candidates.length === 0 ? (
        <p>No candidates found.</p>
      ) : (
        <ul>
          {candidates.map((candidate) => (
            <li key={candidate.id}>
              <strong>{candidate.name}</strong> - {candidate.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CandidatesList;
