import React, { useEffect, useState } from 'react';
import { getTags, addTagToLink, removeTagFromLink } from '../apiCalls/apiCalls';
import './Tags.css';

interface TagsProps {
  linkId: string;
  currentTags: { id: string; name: string }[];
  onClose: () => void;
  onUpdateTags: (updatedTags: { id: string; name: string }[]) => void;
}

interface Tag {
  id: string;
  attributes: {
    name: string;
  };
}

const Tags: React.FC<TagsProps> = ({ linkId, currentTags, onClose, onUpdateTags }) => {
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string }[]>(currentTags);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsData: Tag[] = await getTags(); 
        const simplifiedTags = tagsData.map(tag => ({
          id: tag.id,
          name: tag.attributes.name,
        }));
        setAvailableTags(simplifiedTags);
      } catch (error) {
        setErrorMessage('Failed to fetch tags. Please try again later.'); 
      }
    };

    fetchTags();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleTagClick = async (tag: { id: string; name: string }) => {
    try {
      if (selectedTags.find((selectedTag) => selectedTag.id === tag.id)) {
        const updatedTags = await removeTagFromLink(linkId, tag.id);
        setSelectedTags(updatedTags);
        onUpdateTags(updatedTags);
        setErrorMessage(null);
      } else {
        const updatedTags = await addTagToLink(linkId, tag.id);
        setSelectedTags(updatedTags);
        onUpdateTags(updatedTags);
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage('Error updating tags. Please try again later.');
    }
  };

  const handleDeleteTag = async (tagId: string) => {
    try {
      const updatedTags = await removeTagFromLink(linkId, tagId);
      setSelectedTags(updatedTags);
      onUpdateTags(updatedTags);
      setErrorMessage(null); 
    } catch (error) {
      setErrorMessage('Error deleting tag. Please try again later.'); 
    }
  };

  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).classList.contains('tags-popup')) {
      onClose();
    }
  };

  return (
    <div className="tags-popup" onClick={handleOutsideClick}>
      <div className="tags-popup-content">
        <h2>Manage Tags for Link</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="tag-list">
          {availableTags.map((tag) => (
            <div
              key={tag.id}
              className={`tag-item ${selectedTags.find((selectedTag) => selectedTag.id === tag.id) ? 'selected' : ''}`}
            >
              <span onClick={() => handleTagClick(tag)}>{tag.name}</span>
              {selectedTags.find((selectedTag) => selectedTag.id === tag.id) && (
                <button
                  className="delete-tag-button"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;