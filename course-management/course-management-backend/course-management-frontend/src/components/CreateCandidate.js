import React, { useState } from 'react';
import axios from 'axios';

const CreateCandidate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [course_id, setCourseId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/candidates', {
                name,
                email,
                phone,
                course_id
            });
            console.log('Kandidati u shtua:', response.data);
        } catch (error) {
            console.error('Gabim gjatë shtimit të kandidatit:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
            <input type="number" value={course_id} onChange={(e) => setCourseId(e.target.value)} placeholder="Course ID" />
            <button type="submit">Add Candidate</button>
        </form>
    );
};

export default CreateCandidate;
