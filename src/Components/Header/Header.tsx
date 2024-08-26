import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="left-section">
                    <img src="/turlink_logo.png" alt="TurLink's logo" className="logo"></img>
                    <h1 className="site-name">TurLink</h1>
                </div>
                <div className="nav-links">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/login" className="nav-link">Login</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;