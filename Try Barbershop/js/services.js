document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.querySelector('h3').innerText;
        localStorage.setItem('selectedService', serviceName);
        window.location.href = "reservation.html";
    });
    
});
