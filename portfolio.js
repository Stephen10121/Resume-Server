var headerTabs = document.getElementById("header-tabs");
var headerBigTab = document.getElementById("bigtab");
var header = document.getElementById("header");
var tabOpen = false;
const tabSmall = document.getElementById("small-tab-slide");
var tabButton = document.getElementById("showTabButton");

function smallScreen() {
    headerTabs.style.display = "block";
    headerBigTab.style.display = "none";
    header.style.gridTemplateColumns = "80% 20%";
}

function notSmallScreen() {
    headerTabs.style.display = "none";
    headerBigTab.style.display = "block";
    header.style.gridTemplateColumns = "60% 40%";
    closeTab();
}

if (document.body.clientWidth <= 630) {
    smallScreen();
} else {
    notSmallScreen();
}

window.addEventListener('resize', function(event) {
    if (document.body.clientWidth <= 630) {
        smallScreen();
    } else {
        notSmallScreen();
    }
}, true);

function openTab() {
    tabOpen = true;
    tabButton.style.transform = 'rotate(90deg)';
    tabSmall.style.display = "block";
    setTimeout(() => {
        tabSmall.style.top = "70px";
    }, 80);
}

function closeTab() {
    tabOpen = false;
    tabButton.style.transform = 'rotate(0deg)';
    tabSmall.style.top = "-100px";
    setTimeout(() => {
        tabSmall.style.display = "none";
    }, 100);
}

function showTabs() {
    if (tabOpen == false){
        openTab();
    } else {
        closeTab();
    }
}