import React from "react";
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <section className="landing-page">
            <div className="landing-content">
                <div className="text-section">
                    <h1>Welcome to TurLink</h1>
                    <h3>A link shortener for the Turing Community</h3>
                </div>
                <div className="image-section">
                    <img src="/LandingPageImage.jpg" alt="Code on computer screen"></img>
                </div>
            </div>
            <div className="blank section">
            </div>
        </section>
    )
}

export default LandingPage;