import getApiData from "./fetch";

export default function setupData() {
    let currentLocation;

    const getData = async (location, typeFunc) => {
        const rawData = await getApiData(location).catch(() => {return});
        
        if (!rawData) {
            return;
        }

        const [apiMetric, apiUS] = rawData;
        const tempLocation = {
            zone: apiMetric.timezone,
            days:[],
        };

        apiMetric.days.forEach((day) => {
            const tempObj = {
                date: day.datetime,
                tempMetric: day.temp,
                tempMaxMetric: day.tempmax,
                tempMinMetric: day.tempmin,
                humidity: day.humidity,
                precipitation: day.precip,
                type: day.conditions,
                icon: typeFunc(day.conditions),
            };
            tempLocation.days.push(tempObj);
        });

        tempLocation.days.forEach((day, index) => {
            day.tempUS = apiUS.days[index].temp;
            day.tempMaxUS = apiUS.days[index].tempmax;
            day.tempMinUS = apiUS.days[index].tempmin;
        });

        currentLocation = tempLocation;
        console.log(tempLocation);

        
    }

    const getLocation = () => currentLocation;

    return {getData, getLocation};
}