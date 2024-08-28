export function getShortLink(id: number, originalLink: string, navigate: (path: string) => void): Promise<any> {
    return fetch(`https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/users/${id}/links?link=${originalLink}`, {
        method: "POST",
        headers : {
            'Content-Type': 'application/json'
        }
      })
      .then((response) => {
            if(!response.ok){
                throw new Error(`Error on POST message`)
            } else {
                return response.json() }
        })
      .catch((error) => console.log(error))
}

export function fetchTags (){
    return fetch("https://turlink-be-53ba7254a7c1.herokuapp.com/api/v1/tags")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            return data.data.map((tag: any) => ({
                id: tag.id,
                name: tag.attributes.name,
            }));
        })
        .catch((error) => {
            console.error("Error fetching tags:", error);
            return [];
        });
};