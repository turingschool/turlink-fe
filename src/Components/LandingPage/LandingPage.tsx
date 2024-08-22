import React from "react";
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <section className="landing-page">
            <div className="landing-content">
                <div className="text-section">
                    <h1>Welcome to TurLink</h1>
                    <h2>A link shortener for the Turing Community</h2>
                </div>
                <div className="image-section">
                    <img src="/LandingPageImage.jpg" alt="Code on computer screen"></img>
                </div>
            </div>
            <div className="form-section">
                <input type="text" placeholder="paste your link here" className="input-field"></input>
                <button className="submit-button">Try It!</button>
            </div>
        </section>
    )
}

export default LandingPage;