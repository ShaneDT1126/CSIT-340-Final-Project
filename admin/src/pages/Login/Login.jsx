import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with your authentication logic
    if (username === 'admin' && password === 'password') {
      setAuth(true);
      navigate('/add');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <div className="login-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="login-actions">
          <button type="button" className="login-btn" onClick={handleRegisterClick}>Register</button>
          <button type="submit" className="login-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;