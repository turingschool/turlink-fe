import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import LandingPage from '../LandingPage/LandingPage'

//placeholder components for routing
const Dashboard = () => <h1>Dashboard Page</h1>;
const About = () => <h1>About Page</h1>;

function App() {
  return (
    <Router>
      <div className="App">
      <Header />
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