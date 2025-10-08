document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('service').textContent = localStorage.getItem('service') || 'N/A';
  document.getElementById('date').textContent = localStorage.getItem('date') || 'N/A';
  document.getElementById('time').textContent = localStorage.getItem('time') || 'N/A';
  document.getElementById('paymentMethod').textContent = localStorage.getItem('paymentMethod') || 'N/A';
  document.getElementById('referenceNumber').textContent = localStorage.getItem('paymentReference') || 'N/A';
  document.getElementById('downpayment').textContent = localStorage.getItem('downpayment') || '0';
});
