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

    

    export default Dashboard;