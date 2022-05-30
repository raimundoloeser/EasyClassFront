import urlsApis from "../helpers/urlApis";

export default async function deleteReservation(reservation_id) {
    // api
    const apiUrl = `${urlsApis("api")}api/reservation/?id=${reservation_id}`;
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
    )
    const returner = await fetchResponse
    return returner
};