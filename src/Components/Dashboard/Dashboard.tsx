import React, {useState, useEffect} from "react";
import './Dashboard.css';
import { fetchTags, fetchTopLinks } from "../apiCalls/apiCalls";
import { set } from "cypress/types/lodash";

interface Link {
    name: string;
    clickCount: number;
    tags: string[];
}

interface Tag {
    id: string;
    name: string;
}

const Dashboard: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const tagsQuery = selectedTags.length > 0 ? selectedTags.join(',') : '';
        fetchTopLinks(tagsQuery)
            .then((fetchedLinks) => {
                if (fetchedLinks.length === 0) {
                    setLinks([]);
                    setError("No links found for the selected tags, please select another filter.");
                } else {
                    setLinks(fetchedLinks);
                    setError("");
                }
            })
            .catch((err) => {
                setLinks([]);
                setError("Failed to load top links.");
    });}, [selectedTags]);

    useEffect(() => {
        fetchTags().then((fetchedTags) => setTags(fetchedTags))
    }, []);

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = event.target.value;
        if (selectedTag && !selectedTags.includes(selectedTag)) {
       setSelectedTags([...selectedTags, selectedTag]);
        }
    };

    const removeTagFilter = (tagToRemove: string) => {
        const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
        setSelectedTags(updatedTags);
    }

    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
            </section>
            <section className="popular-links">
                <h2>Popular Links</h2>
                {error && <p className="error-message">{error}</p>}
                {!error && (
                    <div className="links-table">
                        <div className="table-header">
                            <div className="header-item"></div>
                            <div className="header-item">Click Count</div>
                            <div className="header-item">Tags</div>
                        </div>
                        {links.map((link, index) => (
                            <div key={index} className="table-row">
                                <div className="table-item link-name">
                                    <a href={link.name}>{link.name}</a>
                                </div>
                                <div className="table-item click-count">{link.clickCount}</div>
                                <div className="table-item tags">
                                    {link.tags.length > 0 ? (
                                        link.tags.map((tag, idx) => (
                                            <span key={idx} className="tag">{tag}</span>
                                        ))
                                    ) : (
                                        <span className="no-tag">No tags assigned for this link</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="filter-by-tag">
                <h2>Filter by Tag</h2>
                <select className="tag-filter" onChange={handleTagChange}>
                    <option value="">Select a tag</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <div className="current-filters">
                    <p className="current">Current filters:</p>
                    {selectedTags.length > 0 ? (
                        selectedTags.map((tag, index) => (
                        <span key={index} className="tag-filter-item">
                        {tag}
                        <button 
                        className="remove-tag-button" onClick={() => removeTagFilter(tag)}>x</button>
                        
                        </span>
                        ))
                    ) : (
                        <span className="no-filter">No filter applied yet, select one from the dropdown to see the top 5 links for that tag.</span>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;