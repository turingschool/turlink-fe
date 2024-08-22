import React from "react";
import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <nav className="navbar">
                <div className="left-section">
                    <img src="/turlink_logo.png" alt="TurLink's logo"></img>
                    <h1 className="site-name">TurLink</h1>
                </div>
                <div className="nav-links">
                    <a href="/dashboard" className="nav-link">Dashboard</a>
                    <a href="/about" className="nav-link">About</a>
                    <a href="/login" className="nav-link">Login</a>
                </div>
            </nav>
        </header>
    )
}

export default Header;