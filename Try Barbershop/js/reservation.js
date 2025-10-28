const reservationForm = document.getElementById('reservationForm');
const cancelBtn = document.getElementById('cancelBtn');

// Retrieve selected service from local storage
const selectedService = localStorage.getItem('selectedService');
if (selectedService) {
    document.getElementById('service').value = selectedService;
    localStorage.removeItem('selectedService');
}

// tattoo quantity logic 
const serviceSelect = document.getElementById('service');
const tattooQuantitySection = document.getElementById('tattooQuantitySection');
const tattooQuantityInput = document.getElementById('tattooQuantity');

serviceSelect.addEventListener('change', function() {
    const selectedService = serviceSelect.value;

    //  tattoo options
    if (selectedService === 'Tattoo Small' || selectedService === 'Tattoo Big') {
        tattooQuantitySection.style.display = 'block';
        tattooQuantityInput.required = true;
    } else {
        tattooQuantitySection.style.display = 'none';
        tattooQuantityInput.required = false;
        tattooQuantityInput.value = '';
    }
});

// Reservation form submission 
reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const service = serviceSelect.value;

    const selectedDate = new Date(dateInput);
    const today = new Date();
    today.setHours(0,0,0,0);

    if (selectedDate < today) {
        alert("You cannot select a past date.");
        return;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);
    if (hours < 9 || hours > 23 || (hours === 23 && minutes > 0)) {
        alert("Time must be between 9:00 AM and 11:00 PM.");
        return;
    }

    localStorage.setItem('selectedService', service);
    localStorage.setItem('reservationDate', dateInput);
    localStorage.setItem('reservationTime', timeInput);

    // Store tattoo quantity if applicable
    if (service === 'Tattoo Small' || service === 'Tattoo Big') {
        localStorage.setItem('tattooQuantity', tattooQuantityInput.value || 1);
    } else {
        localStorage.removeItem('tattooQuantity');
    }

    alert("Reservation successful!");
    window.location.href = "payment.html";
});

//  Cancel button
document.getElementById("cancelBtn").addEventListener("click", function () {
  if (confirm("Are you sure you want to cancel your reservation?")) {
    window.location.href = "services.html"; 
  }
});
