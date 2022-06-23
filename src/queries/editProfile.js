import urlsApis from "../helpers/urlApis";

export default async function editProfile(params) {
    // api
    const apiUrl = `${urlsApis("api")}api/me/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(params),
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