import './Dashboard.css';
import { useState, useEffect } from "react";
import { fetchTags, fetchTopLinks, incrementClickCountAndVisitUrl } from "../apiCalls/apiCalls";

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
    const [error, setError] = useState<string>("");

    useEffect(() => {
        fetchTopLinks()
            .then((fetchedLinks) => {
                if (fetchedLinks.length === 0) {
                    setError("No links found.");
                } else {
                    setLinks(fetchedLinks);
                }
            })
            .catch((err) => setError("Failed to load top links."));
    }, []);

    useEffect(() => {
        fetchTags().then((fetchedTags) => setTags(fetchedTags))
    }, []);

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = event.target.value;
        setSelectedTag(selectedTag);
        setError("");

        fetchTopLinks(selectedTag)
            .then((fetchedLinks) => {
                if (fetchedLinks.length === 0) {
                    setLinks([]);
                    setError("No links found for the selected tag, please select another filter.");
                } else {
                    setLinks(fetchedLinks);
                }
            })
            .catch((err) => {
                setLinks([]);
                setError("Error fetching links for the selected tag.");
            });
    };

    const handleClick = (shortenedLink:string, event:React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        incrementClickCountAndVisitUrl(shortenedLink)
        .then(data => {
            const originalURL = data.data.attributes.original
            window.open(originalURL)
        })       
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
                                    <a onClick={(event:React.MouseEvent<HTMLAnchorElement>) => handleClick(link.name, event)} href={link.name}>{link.name}</a>
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
                <select className="tag-filter" value={selectedTag} onChange={handleTagChange}>
                    <option value="">Select a tag</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>
                <div className="current-filters">
                    <p className="current">Current filters:</p>
                    {selectedTag ? (
                        <span className="tag">{selectedTag}</span>
                    ) : (
                        <span className="no-filter">No filter applied yet, select one from the dropdown to see the top 5 links for that tag.</span>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
