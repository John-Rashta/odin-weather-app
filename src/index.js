import "../assets/styles/styles.css";
import setupData from "./data";
import getType from "./type";
import setupDom from "./dom";

const pageLoad = function pageSetupLoadingManagement() {
  const dataMon = setupData();
  const domMon = setupDom();
  let searchInProgress = false;

  document.querySelector("#searchForm").addEventListener("submit", (event) => {
    if (searchInProgress) {
      return;
    }
    searchInProgress = true;
    event.preventDefault();
    const formInfo = domMon.getFormData();

    if (!formInfo) {
      searchInProgress = false;
      return;
    }
    domMon.startSearch();
    dataMon
      .getData(formInfo, getType)
      .then((value) => {
        searchInProgress = false;
        domMon.clearSearch();
        domMon.updatePage(value);
      })
      .catch(() => {
        searchInProgress = false;
        domMon.emptySearch();
      });
  });

  document
    .querySelector(".tempContainer")
    .addEventListener("change", (event) => {
      if (searchInProgress) {
        return;
      }
      domMon.changeTemperature(
        dataMon.getLocation(),
        domMon.getMeasure(event.target),
      );
    });
};

pageLoad();
