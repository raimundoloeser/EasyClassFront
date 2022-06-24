import urlsApis from "../helpers/urlApis";

export default async function editProfile(params) {
    // api
    console.log("PARAMS", params)
    const apiUrl = `${urlsApis("api")}api/me/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'PATCH',
            mode: 'cors',
            body: params,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage['access-token']
            },
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    console.log("EDIT RETURNER", returner)
    return returner
};