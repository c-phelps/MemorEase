import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Auth from "../utils/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const logoutUser = () => {
    Auth.logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MemorEase</Link>
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="navbar-toggle-icon"></span>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link to="/decks" onClick={toggleMenu}>
          Decks
        </Link>
        <Link to="/Collection" onClick={toggleMenu}>
          Collection
        </Link>
        <Link to="/" onClick={logoutUser}>
          Log Out
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
