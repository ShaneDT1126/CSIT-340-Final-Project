import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import AdminService from "../../service/AdminService.js";

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const userData = await AdminService.register(formData);
      console.log('Register Success', userData);
      navigate('/login');
      setFormData({
          username: '',
          password: ''
        })

    }catch (error){
      console.log("Error occurred: ", error);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]:value});
    console.log(formData)
  }

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="register">
      <h2>Admin Register</h2>
      <form onSubmit={handleRegister}>
        <div className="register-input">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="register-actions">
          <button type="button" className="register-btn" onClick={handleBackToLogin}>Back to Login</button>
          <button type="submit" className="register-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;