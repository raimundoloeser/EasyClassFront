import urlsApis from "../helpers/urlApis";

export default async function institutions() {
    // api 
    const apiUrl = `${urlsApis("api")}api/institutions/`;
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