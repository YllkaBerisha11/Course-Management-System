import React from 'react';
import axios from 'axios';

const DeleteCandidate = ({ candidateId, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/candidates/${candidateId}`);
      alert('Kandidati u fshi me sukses!');
      onDelete(candidateId); // Tërhiqni kandidatin nga lista pas fshirjes
    } catch (error) {
      console.error('Gabim gjatë fshirjes së kandidatit:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Fshi Kandidatin</button>
  );
};

export default DeleteCandidate;
