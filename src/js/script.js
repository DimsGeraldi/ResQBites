AOS.init();
var nav = document.querySelector('nav');

document.addEventListener('DOMContentLoaded', function () {
    var offcanvasElement = document.getElementById('offcanvasNavbar');

    var navLinks = offcanvasElement.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvasInstance) {
                offcanvasInstance.hide();
            }
        });
    });
});

window.addEventListener('scroll', function () {
    if (window.pageYOffset > 100) {
        nav.classList.add('shadow');
    } else {
        nav.classList.remove('shadow');
    }
});

const scrollable = document.querySelector('.cards-wrapper-menu');
const scrollableMitra = document.querySelector('.cards-wrapper-mitra');
scrollable.addEventListener('wheel', function (e) {
    e.preventDefault();
    // scrollable.scrollLeft += e.deltaY;
    scrollable.scrollLeft += e.deltaY * 2;
});
scrollableMitra.addEventListener('wheel', function (e) {
    e.preventDefault();
    // scrollable.scrollLeft += e.deltaY;
    scrollableMitra.scrollLeft += e.deltaY * 2;
});

function increaseQuantity(element) {
    let quantityElement = element.parentNode.querySelector('.num-quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = currentQuantity + 1;
}

function decreaseQuantity(element) {
    let quantityElement = element.parentNode.querySelector('.num-quantity');
    let currentQuantity = parseInt(quantityElement.textContent);
    if (currentQuantity > 1) {
        quantityElement.textContent = currentQuantity - 1;
    }
}