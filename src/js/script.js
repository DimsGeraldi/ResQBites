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

// Initialize the address modal
function initializeAddressModal() {
    const addressModalElement = document.getElementById('address-modal');
    if (addressModalElement) {
        const addressModal = new bootstrap.Modal(addressModalElement);

        // Attach event listener to the change address button
        const changeAddressBtn = document.getElementById('change-address-btn');
        if (changeAddressBtn) {
            changeAddressBtn.addEventListener('click', function () {
                showAddressModal(addressModal);
            });
        } else {
            console.error('Change address button not found.');
        }

        // Attach event listener to the address form
        const addressForm = document.getElementById('address-form');
        if (addressForm) {
            addressForm.addEventListener('submit', function (event) {
                event.preventDefault();
                updateAddressDisplay();
                hideAddressModal(addressModal);
            });
        } else {
            console.error('Address form not found.');
        }
    } else {
        console.error('Address modal element not found.');
    }
}

/**
 * Show the address modal
 * @param {bootstrap.Modal} modal - The bootstrap modal instance
 */
function showAddressModal(modal) {
    modal.show();
}

/**
 * Hide the address modal
 * @param {bootstrap.Modal} modal - The bootstrap modal instance
 */
function hideAddressModal(modal) {
    modal.hide();
}

/**
 * Update the address display with the values from the form
 */
function updateAddressDisplay() {
    const street = getFormValue('street');
    const rt = getFormValue('rt');
    const rw = getFormValue('rw');
    const houseNumber = getFormValue('houseNumber');
    const subdistrict = getFormValue('subdistrict');
    const district = getFormValue('district');
    const city = getFormValue('city');
    const province = getFormValue('province');
    const postalCode = getFormValue('postalCode');

    const addressDisplay = document.getElementById('address-display');
    if (addressDisplay) {
        addressDisplay.textContent = `${street}, RT ${rt} RW ${rw}, No ${houseNumber}, Kelurahan ${subdistrict}, Kecamatan ${district}, Kota ${city}, Provinsi ${province}, Kode Pos ${postalCode}`;
    } else {
        console.error('Address display element not found.');
    }
}

/**
 * Get the value of a form input by its ID
 * @param {string} id - The ID of the form input
 * @returns {string} - The value of the form input
 */
function getFormValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function () {
    initializeAOS();
    initializeOffcanvas();
    initializeOrderFilter();
    initializeDeliveryPickup();
    initializeScrollable();
    initializeQuantityControls();
    initializeNavShadow();
    initializeAddressModal();
});
