import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import AdminService from "../../service/AdminService.js";

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   // Replace this with your authentication logic
  //   if (username === 'admin' && password === 'password') {
  //     setAuth(true);
  //     navigate('/add');
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

  const loginHandler = async (e) =>{
    e.preventDefault()

    try {
      const admin = await AdminService.login(username,password);
      console.log(admin);
      if (admin.token){
        localStorage.setItem('token',admin.token);
        localStorage.setItem('role', admin.role);
        setAuth(true);
        navigate(`/add`);

      }
    }catch (error){
      console.log(error);
    }
  }

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="login">
      <h2>Admin Login</h2>
      <form onSubmit={loginHandler}>
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