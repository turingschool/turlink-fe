import React, { useEffect, useState } from 'react';
import { getUserLinks, getTagsForLink, addTagToLink, removeTagFromLink } from '../apiCalls/apiCalls';
import Tags from '../Tags/Tags';
import './MyLinks.css';

interface Link {
  id: number;
  original: string;
  short: string;
  created_at: string;
  updated_at: string;
}


const MyLinks: React.FC = () => {
    const [links, setLinks] = useState<Link[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [selectedLink, setSelectedLink] = useState<Link | null>(null);
    const [tagsForLink, setTagsForLink] = useState<{ id: string; name: string }[]>([]);
    const userId = JSON.parse(localStorage.getItem('userData') || '{}').id;

    useEffect(() => {
        if (userId) {
          fetchUserLinks(userId);
        }
      }, [userId]);
    
      const fetchUserLinks = async (userId: string) => {
        try {
          const links = await getUserLinks(userId);
          setLinks(links);
        } catch (error) {
          console.error('Error fetching user links:', error);
        }
      };
    
      const openTagsPopup = async (link: Link) => {
        setSelectedLink(link);
        try {
          const tags = await getTagsForLink(link.id.toString());
          setTagsForLink(tags);
        } catch (error) {
          console.error('Error fetching tags for link:', error);
        }
        setIsPopupOpen(true);
      };
    
      const closeTagsPopup = () => {
        setIsPopupOpen(false);
        setSelectedLink(null);
      };
    
      const handleTagUpdate = async (updatedTags: { id: string; name: string }[]) => {
        setTagsForLink(updatedTags);
        if (selectedLink) {
          await fetchUserLinks(userId);
        }
      };
      return (
        <div className="my-links-container">
          <h2>My Links</h2>
          {links.length === 0 ? (
            <p>No links available.</p>
          ) : (
            links.map((link) => (
              <div key={link.id} className="link-item">
                <p>Original: {link.original}</p>
                <p>
                  Short: <a href={link.short} target="_blank" rel="noopener noreferrer">{link.short}</a>
                </p>
                <button onClick={() => openTagsPopup(link)}>Manage Tags</button>
              </div>
            ))
          )}
    
          {isPopupOpen && selectedLink && (
            <Tags
              linkId={selectedLink.id.toString()}
              currentTags={tagsForLink}
              onClose={closeTagsPopup}
              onUpdateTags={handleTagUpdate}
            />
          )}
        </div>
      );
    };
    
    export default MyLinks;