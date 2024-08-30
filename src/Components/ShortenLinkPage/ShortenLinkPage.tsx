import React from 'react';
import './ShortenLinkPage.css'
import { useState, useEffect } from 'react'
import CopyLink from '../CopyLink/CopyLink'
import InputField from '../InputField/InputField'
import { getShortLink } from '../apiCalls/apiCalls'
import { useNavigate } from 'react-router-dom'


const ShortenLinkPage: React.FC = () => {
    const [originalLink, setOriginalLink] = useState<string>('')
    const [shortenedLink, setShortenedLink] = useState<string>('')
    const [tags, setTags] = useState<string[]>([])
    const [userId, setUserId] = useState<string>('')
    const navigate = useNavigate();

    useEffect(() => {
        const userIdString = localStorage.getItem('userId');
        const userId = userIdString ? parseInt(userIdString, 10) : null;
        if (userId === null || isNaN(userId)) {
            navigate('/login');
        } else {
            setUserId(userId.toString())
        }
    }, [navigate]);


    const submitOriginalLink = (linkInput: string) => {
        const userIdString = localStorage.getItem('userId');
        const userId = userIdString ? parseInt(userIdString, 10) : null;

        if (userId !== null && !isNaN(userId)) {
            getShortLink(userId, linkInput, navigate)
                .then((data) => {
                    const attributes = data.data.attributes;
                    setOriginalLink(attributes.original);
                    setShortenedLink(attributes.short);
                    setTags(attributes.tags);
                    setUserId(attributes.user_id);
                });
        } else {
            navigate('/login'); 
        }
    }

    return (
        <section className='shorten-link-page'>
            <div className="shorten-link-header">
                <p className="shorten-link-header-text">Shorten Your Link</p>
            </div>
            <InputField submitOriginalLink={submitOriginalLink}/>
            <CopyLink shortenedLink={shortenedLink} originalLink={originalLink}/>
        </section>
    )
}

export default ShortenLinkPage