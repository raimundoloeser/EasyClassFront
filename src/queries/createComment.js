import urlsApis from "../helpers/urlApis";

export default async function createComment(body, rating, teacher_id) {
    // api
    let data = {
        "body": body,
        "rating": rating,
        "teacher": teacher_id
    }
    data = JSON.stringify(data)
    const apiUrl = `${urlsApis("api")}api/comment/`;
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