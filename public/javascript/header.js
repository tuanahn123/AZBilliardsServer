// //Hide/show header
// Get components
var header = document.getElementById("header");

var prevYPos = window.scrollY;
var isVisibleHeader = true;

window.onscroll = function NavScroll() {
    var currYPos = window.scrollY;

    if (prevYPos > currYPos) {
        header.style.top = "0";
        isVisibleHeader = true;
    } else {
        header.style.top = "-110px";
        isVisibleHeader = false;
    }

    prevYPos = currYPos;
};