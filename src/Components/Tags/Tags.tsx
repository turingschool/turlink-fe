import React, { useEffect, useState } from 'react';
import { getTags, addTagToLink, removeTagFromLink, getTagsForLink } from '../apiCalls/apiCalls';

type Tag = {
  id: string;
  attributes: {
    name: string;
  };
};

