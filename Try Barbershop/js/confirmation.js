// Display reservation and payment info
document.getElementById('service').innerText = localStorage.getItem('selectedService') || 'N/A';
document.getElementById('date').innerText = localStorage.getItem('reservationDate') || 'N/A';
document.getElementById('time').innerText = localStorage.getItem('reservationTime') || 'N/A';
document.getElementById('paymentMethod').innerText = localStorage.getItem('paymentMethod') || 'N/A';
document.getElementById('referenceNumber').innerText = localStorage.getItem('paymentReference') || 'N/A';
