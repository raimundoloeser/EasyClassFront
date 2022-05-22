const urlsApis = (key) => {
    const urlsDict = {
        "api": "http://localhost:8000/",
    }
    return urlsDict[key]
};
export default urlsApis