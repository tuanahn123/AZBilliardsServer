// // close popup
// get elements
var closeBtn = document.getElementById('close-btn');
var popupBackground = document.getElementById('popup-background');
var toolMenu = document.getElementById('cue-menu');
var tableMenu = document.getElementById("table-menu");

closeBtn.onclick = ClosePopup;

function ClosePopup() {
    popupBackground.style.display = "none";
    toolMenu.style.display = "none";
    tableMenu.style.display = "none";
}

// // open popup tools
// get elements
rentToolBtn = document.getElementById("rent_tool");

// open popup
rentToolBtn.onclick = function openPopup() {
    popupBackground.style.display = "flex";
    toolMenu.style.display = "flex";
    tableMenu.style.display = "none";
}

// // adjust cue amount
// get elements
decBtn = document.getElementById("minus_btn");
incBtn = document.getElementById("plus_btn");
countCue = document.getElementById("cue-quantity");

// decrease
decBtn.onclick = function() {
    count = parseInt(countCue.innerHTML);

    if (count > 2) count--;

    countCue.innerHTML = count;
}

// increase
incBtn.onclick = function() {
    count = parseInt(countCue.innerHTML);

    if (count < 9) count++;

    countCue.innerHTML = count;
}

// // open popup table
// get element
rentTableWithToolsBtn = document.getElementById("rent-table-with-tools");
rentTableNoToolsBtn = document.getElementById("rent-table-no-tools");

// open table on click
rentTableNoToolsBtn.onclick = OpenTableMenu;
rentTableWithToolsBtn.onclick = OpenTableMenu;

function OpenTableMenu() {
    popupBackground.style.display = "flex";
    tableMenu.style.display = "flex";
    toolMenu.style.display = "none";
}

// // call rent
//get element
callRentBtn = document.getElementById("call-rent");

// close popup
callRentBtn.onclick = ClosePopup;
// call rent
