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