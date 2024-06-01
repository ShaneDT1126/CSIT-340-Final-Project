import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import UserService from "../../service/UserService";

const LoginPopup = ({ setShowLogin, setIsLoggedIn, usernameApp, setUsernameApp }) => {
  const [currState, setCurrState] = useState("Login");

  // Form Login getters
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  //-----------------------------------------------------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(username, password);
      console.log(userData);
      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        let currUsername = username;
        alert('User logged in successfully');
        setShowLogin(false)
        setIsLoggedIn(true) // if the user is logged in successfully, setLoggedIn should be true
        setUsernameApp(username);
        navigate(`/${username}`);
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  // Form register getters
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      phoneNumber: '',
      address: ''
  });

    const handleRegisterInputChange = (e) => {
      const { name, value } = e.target;
    
      if (name === 'phoneNumber') {
        // Braytas claude ai Oie
        const input = value.replace(/\D/g, '').slice(0, 11);
        setFormData({ ...formData, [name]: input });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    
      console.log("formData:", { ...formData, [name]: value }); 
    };

    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      try {
          const token = localStorage.getItem('token');
          await UserService.register(formData, token);

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
          setShowLogin(false) // 
          navigate('/');

      } catch (error) {
          console.error('Error registering user:', error);
          alert('An error occurred while registering user');
      }
      console.log("formData:", formData);
  };

  

  return (
    <div className="login-popup">
      <form action="" className="login-popup-container" onSubmit={currState === "Login" ? handleLoginSubmit : handleRegisterSubmit}>
      <div className="login-popup-title">
          <h2>{currState}</h2>
          {error && <p className="error-message">{error}</p>}
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? (
            <>
              <input type="text" 
                value={username} 
                placeholder="Enter your email" 
                required 
                onChange={(e) => setUsername(e.target.value)} />
              <input type="password" 
                value={password} 
                placeholder="Enter your password" 
                required 
                onChange={(e) => setPassword(e.target.value)} />
            </>
          ) : (
            <>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleRegisterInputChange} placeholder="Enter your first name" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleRegisterInputChange} placeholder="Enter your last name" required />
              <input type="text" name="username" value={formData.username} onChange={handleRegisterInputChange} placeholder="Enter your username" required />
              <input type="password" name="password" value={formData.password} onChange={handleRegisterInputChange} placeholder="Enter your password" required />
              <input type="email" name="email" value={formData.email} onChange={handleRegisterInputChange} placeholder="Enter your email"  required />
              <input type="text" name="address" value={formData.address} onChange={handleRegisterInputChange} placeholder="Enter your address" required />
              <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleRegisterInputChange} placeholder="Enter your phone number" required pattern="^[0-9]{1,11}$" maxLength="11"/>  
            </>
          )}
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-popup-condition">

        </div>
        {currState === "Login" ? (
          <p className="">
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}> Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("Login")}> Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;