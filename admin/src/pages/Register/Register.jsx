import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import AdminService from '../../service/AdminService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
    address: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const token = localStorage.getItem('token');
      await AdminService.register(formData, token);
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        address: ''
    });
      alert('User registered successfully');
      // Replace this with your registration logic
      console.log('Registered:', { username, password });
      navigate('/login');  
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user');
    }
    console.log("formData:", formData);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  const handleRegisterInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
      console.log("formData:", { ...formData, [name]: value }); // Log the value of formData
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
            onChange={handleRegisterInputChange}
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
            onChange={handleRegisterInputChange}
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
        <div className="register-input">
          <label htmlFor="firstName">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleRegisterInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="lastName">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleRegisterInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="lastName">Email:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.email}
            onChange={handleRegisterInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.address}
            onChange={handleRegisterInputChange}
            required
          />
        </div>
        <div className="register-input">
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleRegisterInputChange}
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
