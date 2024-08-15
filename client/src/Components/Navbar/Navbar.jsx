import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Navbar.css';
import logo from '../../assets/FF.png';

const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login-signup'); 
  };

  return (
    <nav className='container'>
      <img src={logo} alt="Logo" className='logo' onClick={toggleDropdown} />
      <ul className='nav-links'>
        <li><button className='btn'>About</button></li>
        <li><button className='btn'>Contact</button></li>
      </ul>
      {isDropdownVisible && (
        <div className='dropdown'>
          <button className='dropdown-item'>Profile</button>
          <button className='dropdown-item'>Settings</button>
          <button className='dropdown-item'>Help</button>
          <button className='dropdown-item' onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
