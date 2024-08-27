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
  