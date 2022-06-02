import urlsApis from "../helpers/urlApis";

export default async function deleteModule(id) {
    // api
    const apiUrl = `${urlsApis("api")}api/module/?id=${id}`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage['access-token']
            },
        }
    );
    const returner = await fetchResponse
    return returner
};