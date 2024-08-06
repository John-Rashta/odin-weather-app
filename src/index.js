import "../assets/styles/styles.css";
import setupData from "./data";
import getType from "./type";
import setupDom from "./dom";



const dataMon = setupData();
const domMon = setupDom();
dataMon.getData("lisbon", getType).then((value) => domMon.updatePage(value)).then(()=> domMon.changeTemperature(dataMon.getLocation(), "US"));




