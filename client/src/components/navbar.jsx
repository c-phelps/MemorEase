import  { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MemorEase</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon"></span>
      </div>

      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <Link to="/" onClick={toggleMenu}>
          Home
        </Link>
        <Link to="/Collection" onClick={toggleMenu}>
          Collection
        </Link>
        <Link to="/LogOut" onClick={toggleMenu}>
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
