import urlsApis from "../helpers/urlApis";

export default async function modulesListStudent(student_id) {
    // api
    if (student_id) {
        const apiUrl = `${urlsApis("api")}api/modules/?id=&teacher=&start_time=&end_time=&reservation_bool=&date=&student_id=${student_id}`;
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