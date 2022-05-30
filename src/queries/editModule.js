import urlsApis from "../helpers/urlApis";

export default async function editModule(params) {
    // api
    if (Object.keys(params)[0]) {
        const id = Object.keys(params)[0]
        const data = {}
        if (Object.values(params)[0].startDate) {
            let hour_start_time = String(Object.values(params)[0].startDate.getHours()).padStart(2, '0');
            let minute_start_time = String(Object.values(params)[0].startDate.getMinutes()).padStart(2, '0');
            let start_time = hour_start_time + ':' + minute_start_time + ':00';
            let dd = String(Object.values(params)[0].startDate.getDate()).padStart(2, '0');
            let mm = String(Object.values(params)[0].startDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = Object.values(params)[0].startDate.getFullYear();
            let date = yyyy + '-' + mm + '-' + dd;
            data['date'] = date;
            data['start_time'] = start_time;
        }
        if (Object.values(params)[0].endDate) {
            let hour_end_time = String(Object.values(params)[0].endDate.getHours()).padStart(2, '0');
            let minute_end_time = String(Object.values(params)[0].endDate.getMinutes()).padStart(2, '0');
            let end_time = hour_end_time + ':' + minute_end_time + ':00';
            let dd = String(Object.values(params)[0].endDate.getDate()).padStart(2, '0');
            let mm = String(Object.values(params)[0].endDate.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = Object.values(params)[0].endDate.getFullYear();
            let date = yyyy + '-' + mm + '-' + dd;
            data['date'] = date;
            data['end_time'] = end_time;
        }
        const apiUrl = `${urlsApis("api")}api/module/?id=${id}`;
        const fetchResponse = fetch(
            apiUrl,
            {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage['access-token']
                },
                body: JSON.stringify(data),
            }
        ).then((response) => {
            return response.json()
        });
        const returner = await fetchResponse
        return returner
    }
};