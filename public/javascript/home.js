// // carousel
// get components
var carousel = document.getElementById("promotion-carousel-container");
var carouselPages = document.getElementsByClassName("promotion-carousel-content");
var carouselLeftBtn = document.getElementById("promotion-carousel-dec");
var carouselRightBtn = document.getElementById("promotion-carousel-inc");
var carouselNumberBtns = document.getElementsByClassName("promotion-carousel-number-btn");

var currentPage = 0;

autoMove(currentPage);

// move functions
function moveCarousel(n) {
    var i;

    for (i = 0; i < carouselPages.length; i++) {
        carouselPages[i].style.transform = "translate(" + (i-n)*100 + "%";
        carouselNumberBtns[i].classList.remove("active-number-btn");
    }

    carouselNumberBtns[n].classList.add("active-number-btn");
}

carouselLeftBtn.onclick = function() {
    currentPage--;

    if (currentPage == -1) currentPage = carouselPages.length - 1;

    moveCarousel(currentPage);
}

carouselRightBtn.onclick = function() {
    currentPage++;

    if (currentPage == carouselPages.length) currentPage = 0;

    moveCarousel(currentPage);
}

function CurrentPromotionCarousel(n) {
    currentPage = n;

    moveCarousel(currentPage);
}

function autoMove(n) {
    moveCarousel(n);
    setTimeout(incCarousel, 5000)
}

function incCarousel() {
    currentPage++;

    if (currentPage == carouselPages.length) currentPage = 0;

    autoMove(currentPage);
}