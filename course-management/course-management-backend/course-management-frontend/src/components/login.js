import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginregister.css';

const Login = ({ onLogin }) => {  // Merr props onLogin nga App
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const user = {
          email: email,
          role: data.role,
        };

        localStorage.setItem('user', JSON.stringify(user));

        // Përditëso user-in në App për të rifreskuar navbar
        if (onLogin) onLogin(user);

        // Navigo bazuar në rolin
        if (data.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Invalid login credentials!');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <p className="login-text">Course Management System</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        <p className="login-register-text">
          Don't have an account? <Link to="/register">Register now!</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
