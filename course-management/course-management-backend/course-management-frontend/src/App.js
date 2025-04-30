import React from 'react';
import './App.css';  // Lidh skedarin CSS për stilizimin e aplikacionit
import ProfessorsList from './ProfessorsList'; // Importo komponentin që krijuam

function App() {
  return (
    <div className="App">
      <h1>Welcome to the Course Management System</h1>
      <ProfessorsList /> {/* Përfshi komponentin që shfaq profesorët */}
    </div>
  );
}

export default App;
