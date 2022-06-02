import urlsApis from "../helpers/urlApis";

export default async function createModule(start_time, end_time, date) {
    // api
    let data = {
        "start_time": start_time,
        "end_time": end_time,
        "date": date,
        "reservation_bool": '0'
    }
    data = JSON.stringify(data)
    const apiUrl = `${urlsApis("api")}api/module/`;
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