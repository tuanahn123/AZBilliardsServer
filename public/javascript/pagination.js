var currentPage = 1;
var itemsPerPage = 3; // Số lượng phần tử trên mỗi trang, bạn có thể thay đổi giá trị này
var totalItems = document.querySelectorAll('[id^="history_"]').length;
var maxPages = Math.ceil(totalItems / itemsPerPage);

function generatePagination() {
    var pagination = document.getElementById('pagination');
    pagination.innerHTML = ''; // Xóa các nút trang cũ

    var previousButton = '<li id="previous" class="page-item disabled">' +
                            '<a class="page-link" href="#" aria-label="Previous" onclick="previousPage()">' +
                                '<span aria-hidden="true">&laquo;</span>' +
                            '</a>' +
                        '</li>';
    pagination.insertAdjacentHTML('beforeend', previousButton);

    for (var i = 1; i <= maxPages; i++) {
        var pageButton = '<li class="page-item"><a class="page-link" href="#" onclick="changePage(' + i + ')">' + i + '</a></li>';
        pagination.insertAdjacentHTML('beforeend', pageButton);
    }

    var nextButton = '<li id="next" class="page-item">' +
                        '<a class="page-link" href="#" aria-label="Next" onclick="nextPage()">' +
                            '<span aria-hidden="true">&raquo;</span>' +
                        '</a>' +
                    '</li>';
    pagination.insertAdjacentHTML('beforeend', nextButton);

    updatePaginationState();
}

function changePage(page) {
    currentPage = page;
    updatePaginationState();
    showCurrentPageItems();
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePaginationState();
        showCurrentPageItems();
    }
}

function nextPage() {
    if (currentPage < maxPages) {
        currentPage++;
        updatePaginationState();
        showCurrentPageItems();
    }
}

function updatePaginationState() {
    var previousButton = document.getElementById('previous');
    var nextButton = document.getElementById('next');

    if (currentPage === 1) {
        previousButton.classList.add('disabled');
    } else {
        previousButton.classList.remove('disabled');
    }

    if (currentPage === maxPages) {
        nextButton.classList.add('disabled');
    } else {
        nextButton.classList.remove('disabled');
    }
}

function showCurrentPageItems() {
    var startIndex = (currentPage - 1) * itemsPerPage;
    var endIndex = startIndex + itemsPerPage;

    var allItems = document.querySelectorAll('[id^="history_"]');
    allItems.forEach(function(item, index) {
        if (index >= startIndex && index < endIndex) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Tính toán số lượng trang và tạo nút trang ban đầu khi trang được tải
generatePagination();
