function initPopup() {

    // // close popup
    // get elements
    var closeBtn = document.getElementById('close-btn');
    var popupBackground = document.getElementById('popup-background');
    var toolMenu = document.getElementById('cue-menu');
    var tableMenu = document.getElementById("table-menu");

    closeBtn.onclick = closePopup;

    function closePopup() {
        popupBackground.style.display = "none";
        toolMenu.style.display = "none";
        tableMenu.style.display = "none";
    }

    // // open popup tools
    // get elements
    rentToolBtn = document.getElementById("rent_tool");

    // open popup
    rentToolBtn.onclick = openPopup;

    function openPopup() {
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
    decBtn.onclick = decreaseTool;

    function decreaseTool() {
        count = parseInt(countCue.innerHTML);

        if (count > 1) count--;

        countCue.innerHTML = count;
    }

    // increase
    incBtn.onclick = increaseTool;

    function increaseTool() {
        count = parseInt(countCue.innerHTML);

        if (count < 8) count++;

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

        var countTool = $("#cue-quantity").text()
        console.log(countTool);

        $("#info-tools-amount").html(countTool)
        const comboOfHour = {
            '0': {
                start_time: `23:00:00`,
                end_time: `07:00:00`
            },
            '1': {
                start_time: `08:00:00`,
                end_time: `12:00:00`
            },
            '2': {
                start_time: `14:00:00`,
                end_time: `18:00:00`
            },
        }
        const combo = $(".combo.active").attr("data")

        $("#start_time").val(comboOfHour[combo].start_time)
        $("#end_time").val(comboOfHour[combo].end_time)
        $("#start_date").val(new Date().toLocaleDateString("vi-VN"))
        $("#end_date").val(new Date().toLocaleDateString("vi-VN"))
    }

    // // call rent
    //get element
    callRentBtn = document.getElementById("call-rent");

    // close popup
    // callRentBtn.onclick = closePopup;
    // call rent

    // combo
    let combos = document.getElementsByClassName("combo");

    for (let i = 0; i < combos.length; i++) {
        combos[i].onclick = function () {
            for (let i = 0; i < combos.length; i++) {
                combos[i].classList.remove('active');
            }
            this.classList.add('active');
        }
    }

    // // update countTool


}