document.addEventListener('DOMContentLoaded', () => {

    const reservationForm = document.getElementById('reservationForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const serviceSelect = document.getElementById('service');
    const tattooQuantitySection = document.getElementById('tattooQuantitySection');
    const tattooQuantityInput = document.getElementById('tattooQuantity');

    const dropdownParents = document.querySelectorAll('.dropdown-parent');
    dropdownParents.forEach(parent => {
        const icon = parent.querySelector('a, i');
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            dropdownParents.forEach(otherParent => {
                if (otherParent !== parent && otherParent.classList.contains('active')) {
                    otherParent.classList.remove('active');
                }
            });
            parent.classList.toggle('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown-parent')) {
            dropdownParents.forEach(parent => parent.classList.remove('active'));
        }
    });

    const selectedService = localStorage.getItem('selectedService');
    if (selectedService) {
        serviceSelect.value = selectedService;
        if (selectedService === 'Tattoo Small' || selectedService === 'Tattoo Big') {
            tattooQuantitySection.style.display = 'block';
            tattooQuantityInput.required = true;
        }
        localStorage.removeItem('selectedService');
    }

    serviceSelect.addEventListener('change', function() {
        const service = serviceSelect.value;
        if (service === 'Tattoo Small' || service === 'Tattoo Big') {
            tattooQuantitySection.style.display = 'block';
            tattooQuantityInput.required = true;
        } else {
            tattooQuantitySection.style.display = 'none';
            tattooQuantityInput.required = false;
            tattooQuantityInput.value = '';
        }
    });

    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const dateInput = document.getElementById('date').value;
        const timeInput = document.getElementById('time').value;
        const service = serviceSelect.value;

        if (!dateInput || !timeInput || !service) {
            alert("Please fill out all required fields.");
            return;
        }

        const [hours, minutes] = timeInput.split(":").map(Number);
        const reservationDateTime = new Date(dateInput);
        reservationDateTime.setHours(hours, minutes, 0, 0);
        const now = new Date();

        if (reservationDateTime < now) {
            alert("You cannot select a past date or a past time today.");
            return;
        }

        if (hours < 8 || hours > 20 || (hours === 20 && minutes > 0)) {
            alert("Time must be 8:00 AM to 8:00 PM.");
            return;
        }

        localStorage.setItem('selectedService', service);
        localStorage.setItem('reservationDate', dateInput);
        localStorage.setItem('reservationTime', timeInput);

        if (service === 'Tattoo Small' || service === 'Tattoo Big') {
            localStorage.setItem('tattooQuantity', tattooQuantityInput.value || 1);
        } else {
            localStorage.removeItem('tattooQuantity');
        }

        window.location.href = "payment.html";
    });

    cancelBtn.addEventListener("click", function () {
        window.location.href = "services.html";
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

function calculateTotal() {
    // 1. Kunin ang elements
    const quantityInput = document.getElementById('tattooQuantity');
    const serviceInput = document.getElementById('service');
    const totalPriceInput = document.getElementById('totalPrice');

    // 2. Kunin ang values
    // Gamitin ang data-base-price attribute para makuha ang presyo
    const basePrice = parseFloat(serviceInput.getAttribute('data-base-price'));
    
    // Siguraduhin na ang quantity ay valid at hindi bababa sa 1
    let quantity = parseInt(quantityInput.value);
    
    if (isNaN(quantity) || quantity < 1) {
        quantity = 1;
        quantityInput.value = 1; // I-set pabalik sa 1 kung invalid
    }

    // 3. I-calculate ang Total
    const total = basePrice * quantity;

    // 4. I-format ang presyo at ilagay sa Total Price field
    // Ginamit ang toLocaleString() para may comma (e.g., 2,000)
    const formattedTotal = '₱' + total.toLocaleString('en-US'); 
    
    totalPriceInput.value = formattedTotal;
}

// Para mag-set ng initial price sa pag-load ng page
document.addEventListener('DOMContentLoaded', calculateTotal);
