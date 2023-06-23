import React from 'react';
import './Components.scss'; // Import the CSS for the navbar
import logoImage from '../assets/blob.png'; // Import the logo image from the folder

const Navbar = () => {
  return (
    <nav className="navbar">
      <img className="navbar-logo" src={logoImage} alt="Logo" />
    </nav>
  );
};

export default Navbar;
