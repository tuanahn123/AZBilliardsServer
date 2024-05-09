// // menu change
// get components
var menuScreens = document.getElementsByClassName("cue-menu-screen");
var toListMenuBtn = document.getElementById("back-to-list-btn");
var toSelectedCuesMenuBtn = document.getElementById("selected-cues");

ChangeMenus(0);

// change menu
function ChangeMenus(n) {
    var i;

    for (i = 0; i < menuScreens.length; i++) {
        menuScreens[i].style.transform = "translate(" + (i-n)*120 + "%)";
    }
}

toListMenuBtn.onclick = function() {
    ChangeMenus(0);
}

toSelectedCuesMenuBtn.onclick = function() {
    ChangeMenus(1);
}


// // item list
// get components
var listDecBtn = document.getElementById("left-btn");
var listIncBtn = document.getElementById("right-btn");
var listItems = document.getElementsByClassName("cue-list-item");

var currentItem = 0;
var itemLength = listItems[0].offsetWidth;

MoveItems(currentItem);

// cycle items
function MoveItems(n) {
    var i;

    for (i = 0; i < listItems.length; i++) {
        listItems[i].style.transform = "translate(" + (i-n)*133 + "%)";
    }

    if (currentItem >= (listItems.length - 3)) {
        listIncBtn.classList.add("inactive");
    } else {
        listIncBtn.classList.remove("inactive");
    }

    if (currentItem == 0) {
        listDecBtn.classList.add("inactive");
    } else {
        listDecBtn.classList.remove("inactive");
    }
}

listDecBtn.onclick = function() {
    currentItem--;

    MoveItems(currentItem);
}

listIncBtn.onclick = function() {
    currentItem++;

    MoveItems(currentItem)
}

// // selected list
// get component
var selectedListBtn = document.getElementById("selected-cues");

// update btn number
function updateSelectedListBtn(n) {
    var itemAmount = document.querySelector('#selected-cues>span');
    var t = parseInt(itemAmount.innerHTML);

    if (n) t++;
    else t--;

    itemAmount.innerHTML = t.toString();
}


// // add item to list
// get components
var removeBtns = document.getElementsByClassName("rem-item-btn");
var addBtns = document.getElementsByClassName("add-item-btn");
var items = document.getElementsByClassName("cue-list-item");

var itemList = new Map();

// add onclicks
for (var i = 0; i < removeBtns.length; i++) {
    removeBtns[i].classList.add('inactive');
    removeBtns[i].onclick = removeItem;
    addBtns[i].onclick = addItem;
}

// add and remove items
function addItem() {
    var itemAmount = this.parentNode.querySelector('.list-item-amount');
    var itemName = this.parentNode.parentNode.querySelector('h3').innerHTML;

    var t = 0;

    t += parseInt(itemAmount.innerHTML);
    t++;

    itemAmount.innerHTML = t.toString();
    itemList.set(itemName, t);

    // remove inactive state from remove btn
    rem = this.parentNode.querySelector('.rem-item-btn')
    rem.classList.remove('inactive')
    
    updateSelectedListBtn(1);
};

function removeItem() {
    var itemAmount = this.parentNode.querySelector('.list-item-amount') ;
    var itemName = this.parentNode.parentNode.querySelector('h3').innerHTML;

    var t=parseInt(itemAmount.innerHTML);

    if (t > 1) {
        t--;
        itemAmount.innerHTML = t.toString();
        itemList.set(itemName, t);
    } else if (t == 1) {
        t--;
        itemAmount.innerHTML = t.toString();
        itemList.delete(itemName);
        this.classList.add('inactive');
    }

    updateSelectedListBtn(0);
};

// // update to table
// get components
var selectedTable = document.getElementById("selected-cues-table");

// add row function
function addRow(itemAmount, itemName) {
    var row = selectedTable.querySelector('tbody').insertRow(-1);
    var itemPrice;

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = itemName;
    cell2.innerHTML = itemAmount;
    cell3.innerHTML = itemPrice;
}

// update function
function updateTable() {
    body = selectedTable.querySelector('tbody');
    body.innerHTML = '';
    
    itemList.forEach(addRow);
}

// add onclick
toSelectedCuesMenuBtn.addEventListener('click', updateTable);

// // close popup
// get elements
var closeBtn = document.getElementById('close-btn');
var popupBackground = document.getElementById('popup-background');
var popup = document.getElementById('cue-menu');

closeBtn.onclick = function() {
    popupBackground.style.display = "none";
}

// // filter
// get components
var filter = document.getElementById("filter")
var filterBox = document.getElementById("filter-box")

// open filter
filter.onclick = function() {
   filterBox.style.display = "block";
}

// close filter
function hideFilter(element) {
    const closeFilter = event => {
        if (!element.contains(event.target)) {
          filterBox.style.display = "none";
        }
    }

    document.addEventListener('click', closeFilter);
}

hideFilter(filter)



// close on background click
function hidePopup(element) {
    const closePopup = event => {
        if (!element.contains(event.target)) {
          element.parentNode.style.display = "none";
        }
    }

    document.addEventListener('click', closePopup);
}

hidePopup(popup);

// // open popup
// get elements

// open popup
// (thêm onclick cho cái btn vừa get ở trên, xong thêm hàm này vào)
function openPopup() {
    popupBackground.style.display = "block";
}