import React, { useState } from 'react';
import './ProfessorsList.css';

const professorsData = [
  {
    name: "Jane Smith",
    title: "Frontend Developer",
    email: "jane.smith@university.edu",
    phone: "(123) 456-7890",
    office: "Room 101",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    tags: ["JavaScript", "React", "CSS"]
  },
  {
    name: "John Doe",
    title: "Senior React Engineer",
    email: "john.doe@university.edu",
    phone: "(321) 654-9870",
    office: "Room 202",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    tags: ["React", "Redux", "Hooks"]
  },
  {
    name: "Emily Johnson",
    title: "Full Stack Developer",
    email: "emily.johnson@university.edu",
    phone: "(555) 789-4561",
    office: "Room 303",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    tags: ["HTML", "Node.js", "MongoDB"]
  },
  {
    name: "David Lee",
    title: "Next.js Expert",
    email: "david.lee@university.edu",
    phone: "(555) 123-9876",
    office: "Room 404",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    tags: ["Next.js", "SSR", "React"]
  },
  {
    name: "Dr. Sarah Patel",
    title: "AI & ML Specialist",
    email: "sarah.patel@university.edu",
    phone: "(444) 111-2233",
    office: "Room 505",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    tags: ["Machine Learning", "Python", "AI"]
  },
  {
    name: "Prof. Anna Morales",
    title: "Mathematics Lecturer",
    email: "anna.morales@university.edu",
    phone: "(333) 222-1111",
    office: "Room 606",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    tags: ["Algebra", "Geometry", "Equations"]
  }
];

const allTags = [...new Set(professorsData.flatMap(prof => prof.tags))];

const ProfessorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const filtered = professorsData.filter((prof) => {
    const matchesSearch =
      prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prof.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? prof.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="professor-container">
      <h1 className="title-main">Our Professors</h1>

      <input
        type="text"
        placeholder="Search by name or title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <div className="tag-filters">
        <button
          className={`tag-btn ${activeTag === '' ? 'active' : ''}`}
          onClick={() => setActiveTag('')}
        >
          All
        </button>
        {allTags.map((tag, idx) => (
          <button
            key={idx}
            className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="professor-list">
        {filtered.map((prof, index) => (
          <div key={index} className="professor-card">
            <img src={prof.image} alt={prof.name} className="prof-img" />
            <h3>{prof.name}</h3>
            <p className="title">{prof.title}</p>
            <p><strong>Email:</strong> <a href={`mailto:${prof.email}`}>{prof.email}</a></p>
            <p><strong>Phone:</strong> {prof.phone}</p>
            <p><strong>Office:</strong> {prof.office}</p>
            <div className="tags">
              {prof.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessorList;
