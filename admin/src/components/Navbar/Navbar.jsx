import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import AdminService from "../../service/AdminService.js";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = ({setAuth}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
    try {
      if(confirm("Are you sure you want to log out?")){
        await AdminService.logout();
        setAuth(false);
        navigate("/login");
        console.log("logout success!");
        toast.success("Logout Success!")
      }else {
        console.log("Canceled")
      }
    }catch (error){
      console.log("Error: ", error);
    }
  }

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <div className='profile-container' ref={dropdownRef}>
        <img
          className='profile'
          src={assets.profile_image}
          alt="Profile"
          onClick={handleToggleDropdown}
        />
        {dropdownOpen && (
          <div className='dropdown-menu'>
              <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
