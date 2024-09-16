export const getShortLink = async (userId: string, linkInput: string) => {
  const response = await fetch(
    `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/${userId}/links?link=${encodeURIComponent(
      linkInput
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to shorten link");
  }

  const data = await response.json();
  return data;
};
export const fetchTags = async () => {

  const response = await fetch(
    "https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      "Failed to fetch tags:",
      errorData.errors?.[0]?.message || response.statusText
    );
    throw new Error("Failed to fetch tags");
  }

  const data = await response.json();
  return data.data.map((tag: any) => ({
    id: tag.id,
    name: tag.attributes.name,
  }));
};


  export function fetchTopLinks(tags?: string[]) {
    const query = tags && tags.length > 0 ? `?tag=${encodeURIComponent(tags.join(','))}` : '';
    const url = `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/top_links${query}`;
  
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data.length === 0) {
          throw new Error("No links found for the selected tags");
        }
        return data.data.map((link: any) => ({
          name: link.attributes.short,
          clickCount: link.attributes.click_count,
          tags: link.attributes.tags.map((tag: any) => tag.name),
        }));
      })
      .catch((error) => {
        console.error("Error fetching top links:", error);
        return [];
      });
  }

export const getTags = async () => {
  const response = await fetch(
    `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  const data = await response.json();
  return data.data;
};


export const addTagToLink = async (linkId: string, tagId: string) => {
  const response = await fetch(
    `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=${linkId}&tag=${tagId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add tag to link");
  }

  const data = await response.json();

  return data;
};

export const removeTagFromLink = async (linkId: string, tagId: string) => {
  try {
    const response = await fetch(
      `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags/${tagId}?link=${linkId}`,
      {
        method: "DELETE",
      }
    );

    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to remove tag: ${response.status} ${response.statusText} - ${errorText}`
      );
      throw new Error(`Failed to remove tag: ${response.statusText}`);
    }

    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error removing tag from link:", error);
    throw error;
  }
};


export const getTagsForLink = async (linkId: string) => {
  const response = await fetch(
    `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags?link=${linkId}`
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error(
      "Failed to fetch tags for link:",
      errorData.errors[0]?.message || response.statusText
    );
    throw new Error("Failed to fetch tags for link");
  }

  const data = await response.json();
  return data.data.attributes.tags;
};

export const getUserLinks = async (userId: string) => {
  const response = await fetch(
    `https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/${userId}/links`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch user links");
  }
  const data = await response.json();

  if (
    data.data &&
    data.data.attributes &&
    Array.isArray(data.data.attributes.links)
  ) {
    return data.data.attributes.links.map((link: any) => ({
      id: link.id,
      original: link.original,
      short: link.short,
      created_at: link.created_at,
      updated_at: link.updated_at,
    }));
  } else {
    throw new Error("Unexpected data structure");
  }
};
