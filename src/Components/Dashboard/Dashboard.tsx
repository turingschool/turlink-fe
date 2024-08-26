import React from "react";
import './Dashboard.css';

interface Link {
    name: string;
    clickCount: number;
    tags: string[];
}

const popularLinks: Link[] = [
    { name: "https://turlink.tech/edf456", clickCount: 346, tags: ["JavaScript", "UI", "Video"] },
    { name: "https://turlink.tech/edf456", clickCount: 229, tags: ["Ruby", "Rails", "Blog"] },
    { name: "https://turlink.tech/edf456", clickCount: 216, tags: ["Ruby", "Rails", "Docs"] },
    { name: "https://turlink.tech/edf456", clickCount: 189, tags: ["JavaScript", "Blog"] },
    { name: "https://turlink.tech/edf456", clickCount: 177, tags: ["Project Mgmt", "Blog"] },
    { name: "https://turlink.tech/edf456", clickCount: 162, tags: ["Vue.js"] },
];

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
            </section>
            <section className="popular-links">
                <h2>Popular Links</h2>
                <div className="links-table">
                    <div className="table-header">
                        <div className="header-item"></div>
                        <div className="header-item">Click Count</div>
                        <div className="header-item">Tags</div>
                    </div>
                    {popularLinks.map((link, index) => (
                        <div key={index} className="table-row">
                            <div className="table-item link-name">
                                <a href={link.name}>{link.name}</a>
                            </div>
                            <div className="table-item click-count">{link.clickCount}</div>
                            <div className="table-item tags">
                                {link.tags.map((tag, idx) => (
                                    <span key={idx} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filter by Tag Section will go here! */}
            <section className="filter-by-tag">
                <h2>Filter by Tag</h2>
                <select className="tag-filter">
                    <option value="">Select a tag</option>
                    {/* Can add options here! */}
                </select>
                <div className="current-filters">
                    <p>Current filters:</p>
                    <span className="tag">JavaScript</span>
                    <span className="tag">Blog</span>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
