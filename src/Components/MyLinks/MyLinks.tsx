import React, { useEffect, useState } from 'react';
import { getUserLinks, getTagsForLink, addTagToLink, removeTagFromLink, incrementClickCountAndVisitUrl } from '../apiCalls/apiCalls';
import Tags from '../Tags/Tags';
import './MyLinks.css';
import { Link } from '../../utils/types';

const MyLinks: React.FC = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [tagsForLink, setTagsForLink] = useState<{ id: string; name: string }[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const userId = localStorage.getItem('userId') || '';

  useEffect(() => {
    if (userId) {
      fetchUserLinks(userId);
    }
  }, [userId]);

  const fetchUserLinks = async (userId: string) => {
    try {
      const links = await getUserLinks(userId);
      const linksWithTags = await Promise.all(
        links.map(async (link: Link) => {
          try {
            const response = await getTagsForLink(link.id.toString());
            const tags = response || [];

            const formattedTags = tags.map((tag: any) => ({
              id: tag.id.toString(),
              name: tag.name,
            }));
            return { ...link, tags: formattedTags };
          } catch (error) {
            console.error(`Error fetching tags for link ${link.id}:`, error);
            return { ...link, tags: [] };
          }
        })
      );

      setLinks(linksWithTags);
      setErrorMessage(null);
    } catch (error) {
      console.error('Error fetching user links:', error);
      setErrorMessage('Error fetching user links. Please try again later.');
    }
  };

  const openTagsPopup = (link: Link) => {
    setSelectedLink(link);
    setTagsForLink(link.tags || []);
    setIsPopupOpen(true);
  };

  const closeTagsPopup = () => {
    setIsPopupOpen(false);
    setSelectedLink(null);
  };

  const handleTagUpdate = (updatedTags: { id: string; name: string }[]) => {
    setTagsForLink(updatedTags);
    if (selectedLink) {
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.id === selectedLink.id ? { ...link, tags: updatedTags } : link
        )
      );
    }
  };

  const onAddTag = async (linkId: string, tagId: string) => {
    try {
      const response = await addTagToLink(linkId, tagId);
      const tags = response.data.attributes.tags || [];
      handleTagUpdate(tags.map((tag: any) => ({ id: tag.id.toString(), name: tag.name })));
    } catch (error) {
      console.error('Error adding tag to link:', error);
      setErrorMessage('Error adding tag. Please try again later.');
    }
  };

  const onRemoveTag = async (linkId: string, tagId: string) => {
    try {
      const response = await removeTagFromLink(linkId, tagId);
      const tags = response.data.attributes.tags || [];
      handleTagUpdate(tags.map((tag: any) => ({ id: tag.id.toString(), name: tag.name })));
    } catch (error) {
      console.error('Error removing tag from link:', error);
      setErrorMessage('Error removing tag. Please try again later.');
    }
  };

  const handleClick = (shortenedLink: string, event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    incrementClickCountAndVisitUrl(shortenedLink)
      .then(data => {
        const originalURL: string = data.data.attributes.original
        window.open(originalURL)
        window.location.reload()
      });
  };

  return (
    <div className="my-links-container">
      <h2>My Links</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {links.length === 0 ? (
        <p>No links available.</p>
      ) : (
        links.map((link) => (
          <div key={link.id} className="link-item">
            <p>Original URL: {link.original}</p>
            <p>Short URL: <a onClick={(event: React.MouseEvent<HTMLAnchorElement>) => handleClick(link.short, event)} href={link.short}>{link.short}</a>
              {/* Short URL: <a href={link.short} target="_blank" rel="noopener noreferrer">{link.short}</a> */}
            </p>
            <div className="tags">
              {link.tags && link.tags.length > 0 ? (
                link.tags.map((tag) => (
                  <span key={tag.id} className="tag">
                    {tag.name}
                  </span>
                ))
              ) : (
                <span className="no-tags">No tags</span>
              )}
            </div>
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
          onAddTag={onAddTag}
          onRemoveTag={onRemoveTag}
        />
      )}
    </div>
  );
};

export default MyLinks;