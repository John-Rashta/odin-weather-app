import { compareAsc} from "date-fns";
import waterIcon from "../assets/img/water.svg";
import humidIcon from "../assets/img/water-percent.svg";
import searchIcon from "../assets/img/magnify.svg";

export default function setupDom() {
    const getIcon = function getSvgForIcon({icon}) {
        const tempImg = new Image();
        tempImg.src = require(`../assets/img/${icon}.svg`);
        return tempImg;
    }

    const makeCard = function MakeCardFromData(data) {
        const mainDiv = document.createElement("div");
        const dateDiv = document.createElement("div");
        const imgDiv = getIcon(data);
        const tempDiv = document.createElement("div");
        const minTempDiv = document.createElement("div");
        const avgTempDiv = document.createElement("div");
        const maxTempDiv = document.createElement("div");
        const waterDiv = document.createElement("div");
        const precipDiv = document.createElement("div");
        const precipText = document.createElement("div");
        const precipIcon = new Image();
        precipIcon.src = waterIcon;
        const humidityDiv = document.createElement("div");
        const humidityText = document.createElement("div");
        const humidityIcon = new Image();
        humidityIcon.src = humidIcon;
        dateDiv.textContent = data.date;
        minTempDiv.textContent = data.tempMinMetric;
        avgTempDiv.textContent = data.tempMetric;
        maxTempDiv.textContent = data.tempMaxMetric;
        precipText.textContent = data.precipitation;
        humidityText.textContent = data.humidity;

        tempDiv.appendChild(minTempDiv);
        tempDiv.appendChild(avgTempDiv);
        tempDiv.appendChild(maxTempDiv);

        precipDiv.appendChild(precipText);
        precipDiv.appendChild(precipIcon);
        humidityDiv.appendChild(humidityText);
        humidityDiv.appendChild(humidityIcon);
        waterDiv.appendChild(precipDiv);
        waterDiv.appendChild(humidityDiv);

        mainDiv.appendChild(dateDiv);
        mainDiv.appendChild(imgDiv);
        mainDiv.appendChild(tempDiv);
        mainDiv.appendChild(waterDiv);

        return mainDiv;

    }

    const updatePage = function updatePageWithNewLocationData(location) {

        console.log(location)
        const zoneDiv = document.querySelector(".zoneName");
        zoneDiv.textContent = location.zone;
        const firstDiv = document.querySelector(".todayDiv");

        while (firstDiv.firstChild) {
            firstDiv.removeChild(firstDiv.firstChild);
        }

        const restDiv = document.querySelector(".restDiv");

        while (restDiv.firstChild) {
            restDiv.removeChild(restDiv.firstChild);
        }
        
        location.days.forEach((day, index) => {
            if (index === 0) {
                const todayDiv = makeCard(day);
                firstDiv.appendChild(todayDiv);
            } else {
                const otherDiv = makeCard(day);
                restDiv.appendChild(otherDiv);
            }
        })

        const selectContainer = document.querySelector(".tempContainer");
        
        while (selectContainer.firstChild) {

            selectContainer.removeChild(selectContainer.firstChild);
        }

        const selectDiv = document.createElement("select");
        selectDiv.classList.toggle("selectMenu");
        selectDiv.setAttribute("name", "selectMeasure");
        const usDiv = document.createElement("option");
        const metricDiv = document.createElement("option");
        usDiv.setAttribute("value", "US");
        metricDiv.setAttribute("value", "Metric");
        usDiv.textContent = "US";
        metricDiv.textContent = "Metric";
        metricDiv.setAttribute("selected", "");

        selectDiv.appendChild(usDiv);
        selectDiv.appendChild(metricDiv);
        selectContainer.appendChild(selectDiv);

    }

    const changeTemperature = function changeTempToUSorMetric(location, measure) {
        const todayDiv = document.querySelector(".todayDiv");
        const firstDiv = todayDiv.children[0].children[2].children;
        firstDiv[0].textContent = location.days[0][`tempMin${measure}`];
        firstDiv[1].textContent = location.days[0][`temp${measure}`];
        firstDiv[2].textContent = location.days[0][`tempMax${measure}`];

        const restDiv = document.querySelector(".restDiv");
        const restChildren = restDiv.children;

        Array.from(restChildren).forEach((day, index) => {
            const currentDiv = day.children[2].children;
            currentDiv[0].textContent = location.days[index+1][`tempMin${measure}`];
            currentDiv[1].textContent = location.days[index+1][`temp${measure}`];
            currentDiv[2].textContent = location.days[index+1][`tempMax${measure}`];

        })


    }

    const containerDiv = document.querySelector(".container");
    const headerDiv = document.createElement("div");
    headerDiv.classList.toggle("header");
    const formTempDiv = document.createElement("div");
    formTempDiv.classList.toggle("formTemp");
    const formDiv = document.createElement("div");
    formDiv.classList.toggle("formDiv");
    const rawForm = document.createElement("form");
    rawForm.setAttribute("id", "searchForm");
    const inputDiv = document.createElement("input");
    inputDiv.setAttribute("type", "text");
    inputDiv.setAttribute("placeholder", "Search Location...");
    inputDiv.setAttribute("name", "search");
    inputDiv.classList.toggle("searchInput");
    const buttonDiv = document.createElement("button");
    buttonDiv.setAttribute("type", "submit");
    buttonDiv.classList.toggle("searchButton");
    const buttonIcon = new Image();
    buttonIcon.src = searchIcon;
    const tempContainer = document.createElement("div");
    tempContainer.classList.toggle("tempContainer");
    const zoneNameDiv = document.createElement("div");
    zoneNameDiv.classList.toggle("zoneName");
    const mainDiv = document.createElement("div");
    mainDiv.classList.toggle("mainBody");
    const todayDiv = document.createElement("div");
    todayDiv.classList.toggle("todayDiv");
    const restDiv = document.createElement("div");
    restDiv.classList.toggle("restDiv");

    buttonDiv.appendChild(buttonIcon);
    rawForm.appendChild(inputDiv);
    rawForm.appendChild(buttonDiv);
    formTempDiv.appendChild(rawForm);
    formTempDiv.appendChild(tempContainer);

    mainDiv.appendChild(todayDiv);
    mainDiv.appendChild(restDiv);


    containerDiv.appendChild(headerDiv);
    containerDiv.appendChild(formTempDiv);
    containerDiv.appendChild(zoneNameDiv);
    containerDiv.appendChild(mainDiv);



    return {updatePage, changeTemperature};

}