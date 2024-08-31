
import React, { useState, useEffect } from 'react';
import './ShortenLinkPage.css';
import CopyLink from '../CopyLink/CopyLink';
import InputField from '../InputField/InputField';
import { getShortLink } from '../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { Link } from '../../utils/types';

interface ShortenLinkPageProps {
  onNewLink: (newLink: Link) => void; 
}

const ShortenLinkPage: React.FC<ShortenLinkPageProps> = ({ onNewLink }) => {
  const initialUserId = localStorage.getItem('userId') || '';
  const [userId, setUserId] = useState<string>(initialUserId);
  const [originalLink, setOriginalLink] = useState<string>('');
  const [shortenedLink, setShortenedLink] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]); 

  const submitOriginalLink = async (linkInput: string) => {
    if (userId) {
      try {
        
        const data = await getShortLink(userId, linkInput);
        const attributes = data.data.attributes;

        const newLink: Link = {
          id: data.data.id,
          original: attributes.original,
          short: attributes.short,
          created_at: attributes.created_at,
          updated_at: attributes.updated_at,
          tags: [], 
        };

        setOriginalLink(newLink.original);
        setShortenedLink(newLink.short);

    
        onNewLink(newLink);
      } catch (error) {
        console.error("Error shortening link:", error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <section className='shorten-link-page'>
      <div className="shorten-link-header">
        <p className="shorten-link-header-text">Shorten Your Link</p>
      </div>
      <InputField submitOriginalLink={submitOriginalLink} />
      <CopyLink shortenedLink={shortenedLink} originalLink={originalLink} />
    </section>
  );
};

export default ShortenLinkPage;