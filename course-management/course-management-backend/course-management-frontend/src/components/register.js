import React, { useState } from 'react';
import './loginregister.css';

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Kontrollo nëse të gjithë fushat janë mbushur
    if (!name || !surname || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const registerData = { name, surname, email, password };

    try {
      // Drejtoje kërkesën në endpoint-in e duhur të backend-it
      const response = await fetch('http://localhost:3001/register', { // Përdor endpoint-in e backend-it
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      // Nëse regjistrimi është i suksesshëm, drejto përdoruesin në login
      if (data.success) {
        window.location.href = '/login'; 
      } else {
        setError('Registration failed! The email may already exist.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <p className="login-text">Course Management System</p>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label>Surname:</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              placeholder="Enter your surname"
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-register-text">
          Do you have an account? <a href="/login">Login now!</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
