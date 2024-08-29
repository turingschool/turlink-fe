import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import { isLoggedIn, clearLogin } from '../../utils/localStorage';

const Header: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(isLoggedIn());
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
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

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="left-section">
                    <Link to="/" className="home-link" onClick={menuOpen ? toggleMenu : undefined}>
                        <img src="/turlink_logo.png" alt="TurLink's logo" className="logo" />
                        <h1 className="site-name">TurLink</h1>
                    </Link>
                </div>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {loggedIn && (
                        <>
                            <Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link>
                            <Link to="/mylinks" className="nav-link" onClick={toggleMenu}>My Links</Link> {/* Added My Links */}
                        </>
                    )}
                    <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
                    {loggedIn ? (
                        <button className="nav-link logout-button" onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button>
                    ) : (
                        <Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link>
                    )}
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </nav>
        </header>
    );
};

export default Header;