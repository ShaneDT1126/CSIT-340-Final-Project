import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  const handleSignIn = () => {
    console.log('Sign In clicked');
    // Implement sign in functionality
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Implement logout functionality
  };

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
