import urlsApis from "../helpers/urlApis";

export default async function get_teacher(id_teacher) {
    // api 
    const apiUrl = `${urlsApis("api")}api/teacher/${id_teacher}/`;
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
};