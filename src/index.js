import "../assets/styles/styles.css";
import setupData from "./data";
import getType from "./type";


const dataMon = setupData();
dataMon.getData("lisbon", getType);
