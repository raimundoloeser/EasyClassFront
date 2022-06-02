import urlsApis from "../helpers/urlApis";

export default async function createReservation(module_id) {
    // api
    let data = {
        "module": module_id,
    }
    data = JSON.stringify(data)
    const apiUrl = `${urlsApis("api")}api/reservation/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage['access-token']
            },
            body: data,
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    return returner
};