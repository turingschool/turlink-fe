import React, {useState, useEffect} from "react";
import './Dashboard.css';
import { fetchTags, fetchTopLinks } from "../apiCalls/apiCalls";

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
    const [selectedTag, setSelectedTag] = useState<string>("");

    useEffect(() => {
        fetchTopLinks().then((fetchedLinks) => setLinks(fetchedLinks))
    }, [])
    
    useEffect(() => {
        fetchTags().then((fetchedTags) => setTags(fetchedTags))
    }, []);

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    };

    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
            </section>
            <section className="popular-links">
                <h2>Popular Links</h2>
                <div className="links-table">
                    <div className="table-header">
                        <div className="header-item">Shortened Link</div>
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
                                    <span className="no-tags">no tags assigned to this link</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Filter by Tag Section will go here! */}
            <section className="filter-by-tag">
                <h2>Filter by Tag</h2>
                <select className="tag-filter" value={selectedTag} onChange={handleTagChange}>
                    <option value="">Select a tag</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <div className="current-filters">
                    <p>Current filters:</p>
                    {selectedTag && <span className="tag">{selectedTag}</span>}
                </div>
            </section>
        </div>
    );
};
export default Dashboard;
