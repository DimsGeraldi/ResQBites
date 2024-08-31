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

    // Metode Pengambilan
    
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

    deliveryRadio.addEventListener('change', updateVisibility);
    pickUpRadio.addEventListener('change', updateVisibility);

    // Initialize visibility based on the default selection
    updateVisibility();
    document.getElementById('change-address-btn').addEventListener('click', function () {
        // Tampilkan modal peta
        document.getElementById('map-modal').style.display = 'block';

        // Inisialisasi peta menggunakan Leaflet.js
        let map = L.map('map').setView([-6.200000, 106.816666], 13); // Jakarta sebagai default

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        let marker = L.marker([-6.200000, 106.816666]).addTo(map);

        // Fungsi untuk memperbarui alamat berdasarkan posisi marker
        function updateAddress(lat, lon) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
                .then(response => response.json())
                .then(data => {
                    let address = data.display_name;
                    document.getElementById('address-display').innerText = address;
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Gagal mendapatkan alamat, coba lagi.');
                });
        }

        // Fungsi untuk mendapatkan dan memperbarui lokasi pengguna
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

        // Panggil fungsi untuk lokasi otomatis saat peta pertama kali muncul
        locateAndUpdate();

        // Update marker dan alamat saat peta diklik
        map.on('click', function (e) {
            let lat = e.latlng.lat;
            let lon = e.latlng.lng;
            marker.setLatLng([lat, lon]);
            updateAddress(lat, lon);
        });

        // Panggil kembali fungsi locateAndUpdate ketika tombol "Cari Lokasi Anda" diklik
        document.getElementById('locate-me-btn').addEventListener('click', function () {
            locateAndUpdate();
        });

        // Konfirmasi alamat baru dan tutup modal
        document.getElementById('confirm-address-btn').addEventListener('click', function () {
            document.getElementById('map-modal').style.display = 'none';
        });

        // Tutup modal ketika tombol close ditekan
        document.getElementById('close-btn').addEventListener('click', function () {
            document.getElementById('map-modal').style.display = 'none';
        });

        // Tutup modal jika klik di luar konten modal
        window.onclick = function (event) {
            if (event.target == document.getElementById('map-modal')) {
                document.getElementById('map-modal').style.display = 'none';
            }
        }
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
