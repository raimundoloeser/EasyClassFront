import urlsApis from "../helpers/urlApis";

export default async function teachersList(comunas, subjects, institutions, price_min, price_max, first_name) {
    // api 
    const apiUrl = `${urlsApis("api")}api/teachers_list/?first_name=${first_name}&last_name=&mail=&phone=&comunas=${comunas}&assignature=&subjects=${subjects}&institutions=${institutions}&price_min=${price_min}&price_max=${price_max}`;
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