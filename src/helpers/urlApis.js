const urlsApis = (key) => {
    const urlsDict = {
        "api": "http://127.0.0.1:8000/",
    }
    return urlsDict[key]
};
export default urlsApis