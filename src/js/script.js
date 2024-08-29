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

    const filterRadios = document.querySelectorAll('.status-cart-saya input[type="radio"]');
    const orders = document.querySelectorAll('.cart-pesanan-saya');

    // Fungsi untuk menampilkan pesanan sesuai dengan filter yang dipilih
    function filterOrders(filter) {
        orders.forEach(order => {
            // Ambil nilai dari atribut data-pesanan-categories
            const category = order.getAttribute('data-pesanan-categories');

            // Tampilkan pesanan jika kategori sesuai atau filter 'semua' dipilih
            if (filter === 'semua' || category === filter) {
                order.classList.add('active');
            } else {
                order.classList.remove('active');
            }
        });
    }

    // Tambahkan event listener untuk setiap input radio
    filterRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                const filter = this.id; // Menggunakan id sebagai filter
                filterOrders(filter);
            }
        });
    });

    // Default filter untuk menampilkan semua pesanan
    filterOrders('semua');
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
const scrollableReview = document.querySelector('.mitra-layout');
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
scrollableReview.addEventListener('wheel', function (e) {
    e.preventDefault();
    // scrollable.scrollLeft += e.deltaY;
    scrollableReview.scrollLeft += e.deltaY * 2;
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