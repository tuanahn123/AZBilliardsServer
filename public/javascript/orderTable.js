const a = document.querySelector.bind(document);
const aa = document.querySelectorAll.bind(document);

const contentMain = a(".content_main");
const contentSub = a(".content_sub");
const mainDescription = a(".main_description");
const subDescription = a(".sub_description");
var type = "main";

function toggleContentMain() {
    if (mainDescription.classList.contains("active")) {
        return;
    } else {
        mainDescription.classList.add("active");
        subDescription.classList.remove("active");
        contentMain.classList.add("active");
        contentMain.classList.remove("hidden");
        contentSub.classList.remove("active");
        contentSub.classList.add("hidden");
    }
}
function toggleContentSub() {
    if (subDescription.classList.contains("active")) {
        return;
    } else {
        subDescription.classList.add("active");
        mainDescription.classList.remove("active");
        contentSub.classList.add("active");
        contentSub.classList.remove("hidden");
        contentMain.classList.remove("active");
        contentMain.classList.add("hidden");
    }
}

mainDescription.addEventListener("click", toggleContentMain);

subDescription.addEventListener("click", toggleContentSub);

