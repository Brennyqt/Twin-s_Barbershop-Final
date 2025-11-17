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
        window.location.href = "dashboard.html";
    });

    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});
