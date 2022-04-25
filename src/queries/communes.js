
export default async function communes() {
    // api 
    const Url = `https://apis.digital.gob.cl/dpa/comunas`;
    const fetchResponse = fetch(
        Url,
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