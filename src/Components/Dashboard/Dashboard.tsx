import React from "react";
import './Dashboard.css';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
            </section>
            <section className="popular-links">
                <h2>Popular Links</h2>
                {/* Popular Links content will be placed here! */}
            </section>
            
            <section className="filter-by-tag">
                <h2>Filter by Tag</h2>
                {/* Filter by Tag content will be placed in here! */}
            </section>
        </div>
    );
}

export default Dashboard;
