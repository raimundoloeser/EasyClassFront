import urlsApis from "../helpers/urlApis";

export default async function register(params) {
    // api 
    const apiUrl = `${urlsApis("api")}api/register/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(params),
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    return returner
};