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