import React, { useState } from 'react';
import api from './axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleRegister = async () => {
        try {
            await api.post('/register', { username, password, role });
            alert('User registered successfully');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <select onChange={(e) => setRole(e.target.value)}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;
