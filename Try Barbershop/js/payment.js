function updatePaymentUI() {
  const method = document.getElementById('method').value;
  const qrContainer = document.getElementById('qr-container');
  const qrImage = document.getElementById('qr-image');
  const referenceInput = document.getElementById('reference');

  // Always show QR and reference input for both methods
  if (method === 'Cash') {
    qrContainer.style.display = 'block';
    qrImage.src = 'qr-cash.jpg'; // 🔹 you can change filename if needed
    referenceInput.placeholder = 'Enter Reference Number';
  } 
  else if (method === 'GCash') {
    qrContainer.style.display = 'block';
    qrImage.src = 'qr-gcash.jpg'; // 🔹 you can change filename if needed
    referenceInput.placeholder = 'Enter GCash Reference Number';
  } 
  else {
    qrContainer.style.display = 'none';
    referenceInput.value = '';
  }
}

const paymentForm = document.getElementById('paymentForm');

paymentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const method = document.getElementById('method').value;
  const reference = document.getElementById('reference').value.trim();
  const downpayment = document.getElementById('downpayment').value.trim();

  if (!method) {
    alert("Please select a payment method.");
    return;
  }

  if (downpayment === "" || isNaN(downpayment)) {
    alert("Please enter a valid downpayment amount.");
    return;
  }

  if (Number(downpayment) < 30) {
    alert("Downpayment must be at least ₱30.");
    return;
  }

  if (reference === "") {
    alert(`Please enter your reference number for ${method} payment.`);
    return;
  }

  // ✅ Save payment + reservation info
  localStorage.setItem('paymentMethod', method);
  localStorage.setItem('paymentReference', reference);
  localStorage.setItem('downpayment', downpayment);

  alert(`Payment successful!\nMethod: ${method}\nDownpayment: ₱${downpayment}`);
  window.location.href = "confirmation.html";
});
