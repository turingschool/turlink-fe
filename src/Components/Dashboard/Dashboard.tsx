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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [error, setError] = useState<string>("");
    const [selectedTagValue, setSelectedTagValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchTopLinks(selectedTags.length > 0 ? selectedTags : undefined)
            .then((fetchedLinks) => {
                if (fetchedLinks.length === 0) {
                    setError(selectedTags.length > 0
                        ? "No links found for the selected tag(s), please select another filter."
                        : "No links were found."
                    );
                    setLinks([]);
                } else {
                    setLinks(fetchedLinks);
                }
            })
            .catch((err) => {
                console.error("Error fetching links:", err);
                setError("We encountered an unexpected error and were unable to load the top 5 links. Please try again later.");
            });
            setIsLoading(false)
    }, [selectedTags]);

    useEffect(() => {
        fetchTags().then((fetchedTags) => setTags(fetchedTags));
    }, []);

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTag = event.target.value;
        setError("");
        if (!selectedTags.includes(selectedTag) && selectedTag !== "") {
            setSelectedTags([...selectedTags, selectedTag]);
        }
        setSelectedTagValue("");
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(updatedTags);
    };

    const handleClick = (shortenedLink: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        incrementClickCountAndVisitUrl(shortenedLink)
            .then(data => {
                const originalURL: string = data.data.attributes.original
                window.open(originalURL);
                window.location.reload();
            });
    };

    return (
        <div className="dashboard-container">
            <section className="dashboard-header">
                <h1>Dashboard</h1>
            </section>
            <section className="popular-links">
                <h2>Popular Links</h2>
                {isLoading && <p className="loading">The Top 5 Links are Loading.</p>}
                {error && <p className="error-message">{error}</p>}
                {!error && (
                    <div className="links-table">
                        <div className="table-header">
                            <div className="header-item" id='tooltip-instructions'>✨ Hover over links for a summary of content</div>
                            <div className="header-item">Click Count</div>
                            <div className="header-item">Tags</div>
                        </div>
                        {links.length > 0 ? (
                            links.map((link, index) => (
                                <div key={index} className="table-row">
                                    <div className="table-item link-name">
                                        <div className="tooltip">
                                            <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleClick(link.name, event)} href={link.name}>{link.name}</a>
                                            <span className="tooltiptext">
                                            ✨ More info about this link
                                            </span>
                                        </div>    
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
                            ))
                        ) : (
                            <p className="no-links">No links found.</p>
                        )}
                    </div>
                )}
            </section>

            <section className="filter-by-tag">
                <h2>Filter by Tag</h2>
                <select className="tag-filter" onChange={handleTagChange}
                    value={selectedTagValue}>
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
                        selectedTags.map((tag, idx) => (
                            <span key={idx} className="tag">
                                {tag} <button onClick={() => removeTag(tag)}>x</button>
                            </span>
                        ))
                    ) : (
                        <span className="no-filter">No filter applied yet, select one from the dropdown to see the top links for that tag.</span>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;