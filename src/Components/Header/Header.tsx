import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import { isLoggedIn, clearLogin } from '../../utils/localStorage';

const Header: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setLoggedIn(isLoggedIn());
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = () => {
        clearLogin();
        setLoggedIn(false);
        navigate('/');
        window.dispatchEvent(new Event('storage'));
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="left-section">
                    <Link to="/" className="home-link">
                        <img src="/turlink_logo.png" alt="TurLink's logo" className="logo" />
                        <h1 className="site-name">TurLink</h1>
                    </Link>
                </div>
                <div className="nav-links">
                    {loggedIn && (
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    )}
                    <Link to="/about" className="nav-link">About</Link>
                    {loggedIn ? (
                        <button className="nav-link logout-button" onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login" className="nav-link">Login</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
