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