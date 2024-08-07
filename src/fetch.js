export default async function getApiData(location) {
    try {
        const firstResponse = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/next6days?unitGroup=metric&key=NNG9MD6V36HCUPVQU9JQ3Z4EH&contentType=json&lang=id`);
        const secondResponse = fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/next6days?unitGroup=us&key=NNG9MD6V36HCUPVQU9JQ3Z4EH&contentType=json&lang=id`);
        return Promise.all([firstResponse, secondResponse]).then((value) => Promise.all(value.map((data) => data.json()))).catch((e) => {console.log(e)});

    } catch {
        return;
    }
}