import urlsApis from "../helpers/urlApis";

export default async function get_user() {
    // api 
    const apiUrl = `${urlsApis("api")}api/me/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage['access-token']
            },
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    return returner
};