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
        navigate(`/${currUsername}`);
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

  const PhoneNumberInput = () => {
    const inputRef = useRef(null); // Create a ref to the input field
  
    const handleNumInputChange = (e) => {
      const inputValue = e.target.value;
      // Check if the input value is a valid numerical character
      if (/^[0-9]*$/.test(inputValue)) {
        // Update phoneNumber state in formData
        setFormData({ ...formData, phoneNumber: inputValue });
      }
      inputRef.current.focus(); // Set focus back to the input field
    };
    
    return (
      <input
        ref={inputRef} // Assign the ref to the input field
        type="tel"
        placeholder="Enter your phone number"
        maxLength={11}
        required
        inputMode="tel"
        value={formData.phoneNumber}
        onChange={handleNumInputChange} // Pass handleNumInputChange to handle phone number changes
        style={{ WebkitAppearance: 'none', MozAppearance: 'textfield', appearance: 'none' }}
      />
    );
  };

    const handleRegisterInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
        console.log("formData:", { ...formData, [name]: value }); // Log the value of formData
    };

    const handleRegisterSubmit = async (e) => {
      e.preventDefault();
      try {
          // Call the register method from UserService

          const token = localStorage.getItem('token');
          await UserService.register(formData, token);

          // Clear the form fields after successful registration
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
      {/* <form action="" className="login-popup-container" onSubmit={handleLoginSubmit}> */}
      <form action="" className="login-popup-container" onSubmit={currState === "Login" ? handleLoginSubmit : handleRegisterSubmit}>
      {/* for this, if the currState is "Login", then I want you to set onSubmit to handleLoginSubmit
          if the currState is "Sign up", I want you to set onSubmit to handleRegisterSubmit */}
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
            {/*  */}
              <input type="text" name="firstName" value={formData.firstName} onChange={handleRegisterInputChange} placeholder="Enter your first name" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleRegisterInputChange} placeholder="Enter your last name" required />
              <input type="text" name="username" value={formData.username} onChange={handleRegisterInputChange} placeholder="Enter your username" required />
              <input type="password" name="password" value={formData.password} onChange={handleRegisterInputChange} placeholder="Enter your password" required />
              <input type="email" name="email" value={formData.email} onChange={handleRegisterInputChange} placeholder="Enter your email"  required />
              <input type="text" name="address" value={formData.address} onChange={handleRegisterInputChange} placeholder="Enter your address" required />
              <PhoneNumberInput /> {/* Including the PhoneNumberInput component */}
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