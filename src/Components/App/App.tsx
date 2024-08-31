import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import LandingPage from '../LandingPage/LandingPage';
import ShortenLinkPage from '../ShortenLinkPage/ShortenLinkPage';
import MyLinks from '../MyLinks/MyLinks';
import { isLoggedIn } from '../../utils/localStorage';
import { Link } from '../../utils/types';

const About = () => <h1>About Page</h1>;

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

function App() {
  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const handleNewLink = (newLink: Link) => {
    setUserLinks((prevLinks) => [...prevLinks, newLink]);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/shortenlink"
            element={
              <ProtectedRoute element={<ShortenLinkPage onNewLink={handleNewLink} />} />
            }
          />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/my-links" element={<ProtectedRoute element={<MyLinks />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;