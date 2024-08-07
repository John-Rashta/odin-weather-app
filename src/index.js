import "../assets/styles/styles.css";
import setupData from "./data";
import getType from "./type";
import setupDom from "./dom";



const pageLoad = function pageSetupLoadingManagement() {
    const dataMon = setupData();
    const domMon = setupDom();

    document.querySelector("#searchForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const formInfo = domMon.getFormData();
        console.log(formInfo);

        if (!formInfo) {
            return;
        }
        domMon.startSearch();
        dataMon.getData(formInfo, getType).then((value) => {
            domMon.clearSearch();
            domMon.updatePage(value);
        }).catch(() => domMon.emptySearch());
    } );

    document.querySelector(".tempContainer").addEventListener("change", (event) => {
        domMon.changeTemperature(dataMon.getLocation(), domMon.getMeasure(event.target));
    })
}

pageLoad();

