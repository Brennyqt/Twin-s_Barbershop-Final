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
        }, 500);
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

reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    if (!dateInput || !timeInput || !service) {
        alert("Please complete all fields.");
        return;
    }

    const selectedDate = new Date(dateInput);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ❌ Bawal pumili ng nakaraang date
    if (selectedDate < today) {
        alert("You cannot select a past date.");
        return;
    }

    const [hours, minutes] = timeInput.split(":").map(Number);
    if (hours < 8 || hours > 20 || (hours === 20 && minutes > 0)) {
        alert("We're open from 8:00 AM to 8:00 PM only.");
        return;
    }

    // 🕗 Bawal mag-book today kapag sarado na
    const now = new Date();
    const currentHour = now.getHours() + now.getMinutes() / 60;

    if (selectedDate.toDateString() === now.toDateString()) {
        if (currentHour < 8 || currentHour >= 20) {
            alert("Sorry, our shop is currently closed. We accept reservations from 8:00 AM to 8:00 PM only.");
            return;
        }
    }

    // ✅ Save reservation details to localStorage
    localStorage.setItem('service', service);
    localStorage.setItem('date', dateInput);
    localStorage.setItem('time', timeInput);

    alert("Reservation successful!");
    window.location.href = "payment.html";
});

cancelBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to cancel your reservation?")) {
        window.location.href = "services.html";
    }
});
