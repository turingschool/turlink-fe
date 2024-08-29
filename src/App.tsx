import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import ShortenLinkPage from './Components/ShortenLinkPage/ShortenedLinkPage';

//placeholder components for routing
const Dashboard = () => <h1>Dashboard Page</h1>;
const About = () => <h1>About Page</h1>;
const Login = () => <h1>Login Page</h1>;

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      <ShortenLinkPage />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      </div>
    </Router>
  );
}

export default App;
