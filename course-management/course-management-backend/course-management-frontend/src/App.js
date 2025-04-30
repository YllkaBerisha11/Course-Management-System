import React from 'react';
import './App.css';  // Lidh skedarin CSS për stilizimin e aplikacionit
import ProfessorsList from './ProfessorsList'; // Importo komponentin që krijuam
import CandidatesList from './CandidatesList'; // Importo komponentin për kandidatët

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Course Management System</h1>
      <ProfessorsList /> {/* Përfshi komponentin që shfaq profesorët */}
      <CandidatesList /> {/* Përfshi komponentin që shfaq kandidatët */}
    </div>
  );
}

export default App;
