import React from 'react';
<<<<<<< HEAD
import './App.css';
import ProfessorsList from './ProfessorsList';  // Sigurohuni që kjo linjë është aty
=======
import './App.css';  // Lidh skedarin CSS për stilizimin e aplikacionit
import ProfessorsList from './ProfessorsList'; // Importo komponentin që krijuam
import CandidatesList from './CandidatesList'; // Importo komponentin për kandidatët
>>>>>>> 68ce6c0c251c6cec431c06c2bc3329e4cf88efc4

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <h1>Course Management System</h1>
      <ProfessorsList />  {/* Ky është komponenti që shfaq listën e profesorëve */}
=======
      <h1>Welcome to the Course Management System</h1>
      <ProfessorsList /> {/* Përfshi komponentin që shfaq profesorët */}
      <CandidatesList /> {/* Përfshi komponentin që shfaq kandidatët */}
>>>>>>> 68ce6c0c251c6cec431c06c2bc3329e4cf88efc4
    </div>
  );
}

export default App;
