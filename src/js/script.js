function goBack() {
    window.history.back();
}

// Initialize AOS
function initializeAOS() {
    AOS.init();
}

// Initialize Bootstrap Offcanvas
function initializeOffcanvas() {
    var offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
        var navLinks = offcanvasElement.querySelectorAll('.nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                var offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (offcanvasInstance) {
                    offcanvasInstance.hide();
                }
            });
        });
    }
}

// Initialize Order Filter
function initializeOrderFilter() {
    const filterRadios = document.querySelectorAll('.status-cart-saya input[type="radio"]');
    const orders = document.querySelectorAll('.cart-pesanan-saya');

    function filterOrders(filter) {
        orders.forEach(order => {
            const category = order.getAttribute('data-pesanan-categories');
            if (filter === 'semua' || category === filter) {
                order.classList.add('active');
            } else {
                order.classList.remove('active');
            }
        });
    }

    filterRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.checked) {
                filterOrders(this.id);
            }
        });
    });

    filterOrders('semua'); // Default filter
}

// Initialize Delivery and Pickup Selection
function initializeDeliveryPickup() {
    const deliverySection = document.getElementById('delivery');
    const pickUpSection = document.getElementById('pick-up');
    const deliveryRadio = document.getElementById('delivery-radio');
    const pickUpRadio = document.getElementById('pick-up-radio');

    function updateVisibility() {
        if (deliveryRadio.checked) {
            deliverySection.style.display = 'block';
            pickUpSection.style.display = 'none';
        } else if (pickUpRadio.checked) {
            deliverySection.style.display = 'none';
            pickUpSection.style.display = 'block';
        }
    }

    if (deliveryRadio && pickUpRadio) {
        deliveryRadio.addEventListener('change', updateVisibility);
        pickUpRadio.addEventListener('change', updateVisibility);
        updateVisibility();
    }
}

// Initialize Map and Address Change
function initializeAddressChange() {
    const changeAddressBtn = document.getElementById('change-address-btn');
    if (changeAddressBtn) {
        changeAddressBtn.addEventListener('click', function () {
            document.getElementById('map-modal').style.display = 'block';
            let map = L.map('map').setView([-6.200000, 106.816666], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
            }).addTo(map);

            let marker = L.marker([-6.200000, 106.816666]).addTo(map);

            function updateAddress(lat, lon) {
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('address-display').innerText = data.display_name;
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Gagal mendapatkan alamat, coba lagi.');
                    });
            }

            function locateAndUpdate() {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        let lat = position.coords.latitude;
                        let lon = position.coords.longitude;
                        map.setView([lat, lon], 13);
                        marker.setLatLng([lat, lon]);
                        updateAddress(lat, lon);
                    }, function () {
                        alert("Tidak dapat mengakses lokasi Anda.");
                    });
                } else {
                    alert("Geolokasi tidak didukung oleh browser Anda.");
                }
            }

            locateAndUpdate();

            map.on('click', function (e) {
                let lat = e.latlng.lat;
                let lon = e.latlng.lng;
                marker.setLatLng([lat, lon]);
                updateAddress(lat, lon);
            });

            document.getElementById('locate-me-btn').addEventListener('click', locateAndUpdate);
            document.getElementById('confirm-address-btn').addEventListener('click', function () {
                document.getElementById('map-modal').style.display = 'none';
            });
            document.getElementById('close-btn').addEventListener('click', function () {
                document.getElementById('map-modal').style.display = 'none';
            });
            window.onclick = function (event) {
                if (event.target == document.getElementById('map-modal')) {
                    document.getElementById('map-modal').style.display = 'none';
                }
            };
        });
    }
}

// Initialize Scrollable Elements
function initializeScrollable() {
    const scrollableElements = [
        document.querySelector('.cards-wrapper-menu'),
        document.querySelector('.cards-wrapper-mitra'),
        document.querySelector('.mitra-layout')
    ];

    scrollableElements.forEach(scrollable => {
        if (scrollable) {
            scrollable.addEventListener('wheel', function (e) {
                e.preventDefault();
                scrollable.scrollLeft += e.deltaY * 2;
            });
        }
    });
}

// Initialize Quantity Controls
function initializeQuantityControls() {
    window.increaseQuantity = function (element) {
        let quantityElement = element.parentNode.querySelector('.num-quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + 1;
    };

    window.decreaseQuantity = function (element) {
        let quantityElement = element.parentNode.querySelector('.num-quantity');
        let currentQuantity = parseInt(quantityElement.textContent);
        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;
        }
    };
}

// Add Shadow to Navbar on Scroll
function initializeNavShadow() {
    var nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 100) {
                nav.classList.add('shadow');
            } else {
                nav.classList.remove('shadow');
            }
        });
    }
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function () {
    initializeAOS();
    initializeOffcanvas();
    initializeOrderFilter();
    initializeDeliveryPickup();
    initializeAddressChange();
    initializeScrollable();
    initializeQuantityControls();
    initializeNavShadow();
});
