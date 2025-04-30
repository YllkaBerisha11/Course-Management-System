import React from 'react';
import './App.css';
import ProfessorsList from './ProfessorsList';  // Sigurohuni që kjo linjë është aty

function App() {
  return (
    <div className="App">
      <h1>Course Management System</h1>
      <ProfessorsList />  {/* Ky është komponenti që shfaq listën e profesorëve */}
    </div>
  );
}

export default App;
