import React, { useState, useEffect } from 'react';
import './ShortenLinkPage.css';
import CopyLink from '../CopyLink/CopyLink';
import InputField from '../InputField/InputField';
import { getShortLink } from '../apiCalls/apiCalls';
import { useNavigate } from 'react-router-dom';
import { Link } from '../../utils/types';
interface Props {
  onNewLink: (link: Link) => void; 
}

const ShortenLinkPage: React.FC<Props> = ({ onNewLink }) => {
  const [originalLink, setOriginalLink] = useState<string>('');
  const [shortenedLink, setShortenedLink] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? userIdString : '';
    if (!userId) {
      navigate('/login');
    } else {
      setUserId(userId);
    }
  }, [navigate]);

  const submitOriginalLink = async (linkInput: string) => {
    const userIdString = localStorage.getItem('userId');
    const userId = userIdString ? userIdString : '';

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