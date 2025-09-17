// Add click event to all service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').innerText;
        // Save selected service to localStorage
        localStorage.setItem('selectedService', serviceName);
        // Redirect to reservation page
        window.location.href = "reservation.html";
    });
});
