import React, { useEffect, useState } from 'react';
import { getTags, addTagToLink, removeTagFromLink, getTagsForLink } from '../apiCalls/apiCalls';

type Tag = {
  id: string;
  attributes: {
    name: string;
  };
};

type TagsProps = {
    linkId: string;
  };
  
  const Tags: React.FC<TagsProps> = ({ linkId }) => {
    const [allTags, setAllTags] = useState<Tag[]>([]);
    const [linkTags, setLinkTags] = useState<Tag[]>([]);
    const [showTags, setShowTags] = useState(false);
    
    useEffect(() => {
    const fetchTags = async () => {
        const tags = await getTags();
        setAllTags(tags);
      };
      fetchTags();

      const fetchLinkTags = async () => {
        const tags = await getTagsForLink(linkId);
        setLinkTags(tags);
      };
      fetchLinkTags();
    }, [linkId]);

    const handleAddTag = async (tagId: string) => {
        const updatedTags = await addTagToLink(linkId, tagId);
        setLinkTags(updatedTags);
      };
    
      const handleRemoveTag = async (tagId: string) => {
        const updatedTags = await removeTagFromLink(linkId, tagId);
        setLinkTags(updatedTags);
      };
    