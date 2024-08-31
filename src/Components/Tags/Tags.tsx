import React, { useEffect, useState } from 'react';
import { fetchTags } from '../apiCalls/apiCalls';
import './Tags.css';

interface TagsProps {
  linkId: string;
  currentTags: { id: string; name: string }[];
  onClose: () => void;
  onUpdateTags: (updatedTags: { id: string; name: string }[]) => void;
  onAddTag: (linkId: string, tagId: string) => void;
  onRemoveTag: (linkId: string, tagId: string) => void;
}

const Tags: React.FC<TagsProps> = ({ linkId, currentTags, onClose, onUpdateTags, onAddTag, onRemoveTag }) => {
  const [availableTags, setAvailableTags] = useState<{ id: string; name: string }[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ id: string; name: string }[]>(currentTags);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableTags = async () => {
      try {
        const response = await fetchTags();
        const tagsData = response.map((tag: any) => ({
          id: tag.id.toString(),
          name: tag.name || 'Name not available',
        }));
        setAvailableTags(tagsData);
        setErrorMessage(null);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
        setErrorMessage('Failed to fetch tags. Please try again later.');
      }
    };

    fetchAvailableTags();
  }, []);

  useEffect(() => {
    setSelectedTags(currentTags);
  }, [currentTags]);

  const handleTagClick = (tag: { id: string; name: string }) => {
    if (selectedTags.find((selectedTag) => selectedTag.id === tag.id)) {
      onRemoveTag(linkId, tag.id);
    } else {
      onAddTag(linkId, tag.id);
    }
  };

  return (
    <div className="tags-popup">
      <div className="tags-popup-content">
        <h2>Manage Tags for Link</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button className="close-button" onClick={onClose}>X</button>
        <div className="tag-list">
          {availableTags.length > 0 ? (
            availableTags.map((tag) => (
              <div
                key={tag.id}
                className={`tag-item ${selectedTags.find((selectedTag) => selectedTag.id === tag.id) ? 'selected' : ''}`}
              >
                <span className="tag-name" onClick={() => handleTagClick(tag)}>{tag.name}</span>
                {selectedTags.find((selectedTag) => selectedTag.id === tag.id) && (
                  <button className="remove-tag-button" onClick={() => handleTagClick(tag)}>x</button>
                )}
              </div>
            ))
          ) : (
            <p>No available tags found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tags;