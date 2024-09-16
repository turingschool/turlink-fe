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

    useEffect(() => {
        fetchTopLinks(selectedTags.length > 0 ? selectedTags : undefined)
            .then((fetchedLinks) => {
                if (fetchedLinks.length === 0) {
                    setError("No links were found.");
                } else {
                    setLinks(fetchedLinks);
                    setError("");
                }
            })
            .catch((error) => {
                console.error(error);
                setError("We encountered an unexpected error and were unable to load the links. Please try again later.");
            });
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
    };

    const removeTag = (tagToRemove: string) => {
        const updatedTags = selectedTags.filter(tag => tag !== tagToRemove);
        setSelectedTags(updatedTags);
    };

    const handleClick = (shortenedLink: string, event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        incrementClickCountAndVisitUrl(shortenedLink)
            .then(data => {
                const originalURL: string = data.data.attributes.original;
                window.open(originalURL);
                window.location.reload();
            });
    };


    export default Dashboard;