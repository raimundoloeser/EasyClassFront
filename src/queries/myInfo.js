import urlsApis from "../helpers/urlApis";

export default async function myInfo() {
    // api
    const apiUrl = `${urlsApis("api")}api/me/`;
    const fetchResponse = fetch(
        apiUrl,
        {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage['access-token']
            },
        }
    ).then((response) => {
        return response.json()
    });
    const returner = await fetchResponse
    localStorage.setItem("user", JSON.stringify(returner));
    localStorage.setItem("id", returner.id);
    localStorage.setItem("is_student", returner.is_student);
    return returner
};