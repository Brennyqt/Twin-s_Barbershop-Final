document.addEventListener('DOMContentLoaded', () => {
  const historyContainer = document.getElementById('historyContainer');

  const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');

  if (reservations.length === 0) {
    historyContainer.innerHTML = '<p class="no-data">You have no reservations yet.</p>';
    return;
  }

  reservations.forEach((res) => {
    const card = document.createElement('div');
    card.classList.add('history-card');

    card.innerHTML = `
      <h3>${res.service}</h3>
      <div class="card-field">
        <span class="card-label">Date:</span>
        <span class="card-value">${res.date}</span>
      </div>
      <div class="card-field">
        <span class="card-label">Time:</span>
        <span class="card-value">${res.time}</span>
      </div>
      <div class="card-field">
        <span class="card-label">Reference No.:</span>
        <span class="card-value">${res.reference_number || 'N/A'}</span>
      </div>
      <div class="card-field">
        <span class="card-label">Payment:</span>
        <span class="card-value">${res.payment_method || 'Pending'}</span>
      </div>
    `;

    historyContainer.appendChild(card);
  });
});
