import urlsApis from "../helpers/urlApis";

export default async function comment(teacher_id) {
    // api
    const apiUrl = `${urlsApis("api")}api/comments/?body=&rating=&teacher=${teacher_id}`;
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