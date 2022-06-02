import urlsApis from "../helpers/urlApis";

export default async function modulesList(teacher_id) {
    // api
    if (teacher_id) {
        const apiUrl = `${urlsApis("api")}api/modules/?id=&teacher=${teacher_id}&start_time=&end_time=&reservation_bool=&date=&prace=`;
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
    } else {
        return null
    }
};