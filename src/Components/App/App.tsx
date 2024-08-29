import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Dashboard from '../Dashboard/Dashboard';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import LandingPage from '../LandingPage/LandingPage';
import MyLinks from '../MyLinks/MyLinks';
import { isLoggedIn } from '../../utils/localStorage';

// Placeholder components for routing
const About = () => <h1>About Page</h1>;

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylinks" element={<ProtectedRoute element={<MyLinks />} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
