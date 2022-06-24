import urlsApis from "../helpers/urlApis";

export default async function hasReservation(teacher_id, student_id) {
    // api
    const apiUrl = `${urlsApis("api")}api/reservation_check/?teacher_id=${teacher_id}&student_id=${student_id}`;
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