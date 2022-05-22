import urlsApis from "../helpers/urlApis";

export default async function subjects() {
    // api 
    const apiUrl = `${urlsApis("api")}api/subjects/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'GET',
            mode: 'cors',
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    return returner
};