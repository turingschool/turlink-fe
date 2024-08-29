export const getTags = async () => {
    const response = await fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags`);
    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }
    const data = await response.json();
    return data.data;
  };

  export const getTagsForLink = async (linkId: string) => {
    const response = await fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=${linkId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tags for link');
    }
    const data = await response.json();
    return data.data.attributes.tags;
  };

  export const addTagToLink = async (linkId: string, tagId: string) => {
    const response = await fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=${linkId}&tag=${tagId}`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error('Failed to add tag to link');
    }
    const data = await response.json();
    return data.data.attributes.tags;
  };

  export const removeTagFromLink = async (linkId: string, tagId: string) => {
    const response = await fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags/${tagId}?link=${linkId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove tag from link');
    }
    const data = await response.json();
    return data.data.attributes.tags;
  };

  export const getUserLinks = async (userId: string) => {
    const response = await fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/${userId}/links`);
    if (!response.ok) {
      throw new Error('Failed to fetch user links');
    }
    const data = await response.json();
    return data.data.attributes.links; 
  };