import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <header className="header">
            <nav className="navbar">
                <div className="left-section">
                    <Link to="/" className="home-link" onClick={closeMenu}>
                        <img src="/turlink_logo.png" alt="TurLink's logo" className="logo" />
                        <h1 className="site-name">TurLink</h1>
                    </Link>
                </div>
                <div className={`nav-links ${isOpen ? "open" : ""}`}>
                    <Link to="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
                    <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
                    <Link to="/login" className="nav-link" onClick={closeMenu}>Login</Link>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
