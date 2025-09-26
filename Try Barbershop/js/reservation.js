// 🌟 Fade-in animation for body and form
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';

    const form = document.querySelector('form');
    if (form) {
        form.style.opacity = '0';
        form.style.transform = 'translateY(10px)';
        setTimeout(() => {
            form.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            form.style.opacity = '1';
            form.style.transform = 'translateY(0)';
        }, 500); // delay for smooth appearance after navbar
    }
});

// 🌟 Reservation form logic
const reservationForm = document.getElementById('reservationForm');
const cancelBtn = document.getElementById('cancelBtn');

const selectedService = localStorage.getItem('selectedService');
if (selectedService) {
    document.getElementById('service').value = selectedService;
    localStorage.removeItem('selectedService');
}

reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const service = document.getElementById('service').value;

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

    alert("Reservation successful!");
    window.location.href = "payment.html";
});

cancelBtn.addEventListener("click", function () {
  if (confirm("Are you sure you want to cancel your reservation?")) {
    window.location.href = "services.html"; 
  }
});
