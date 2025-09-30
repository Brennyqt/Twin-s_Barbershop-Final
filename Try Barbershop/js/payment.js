function updatePaymentUI() {
    const method = document.getElementById('method').value;
    const qrContainer = document.getElementById('qr-container');
    const qrImage = document.getElementById('qr-image');
    const referenceInput = document.getElementById('reference');

    if (method === 'Cash') {
        qrContainer.style.display = 'none';
        referenceInput.value = '';
    } else if (method === 'GCash') {
        qrContainer.style.display = 'block';
        qrImage.src = '../qr.jpg';
    } else if (method === 'QR') {
        qrContainer.style.display = 'block';
        qrImage.src = 'assets/images/qr-default.jpg';
    } else {
        qrContainer.style.display = 'none';
    }
}



// keep existing submit event
paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const method = document.getElementById('method').value;
    const reference = document.getElementById('reference').value.trim();

    if (!method) {
        alert("Please select a payment method.");
        return;
    }

    if ((method === "GCash" || method === "QR") && reference === "") {
        alert("Please enter reference number for selected payment method.");
        return;
    }

    localStorage.setItem('paymentMethod', method);
    localStorage.setItem('paymentReference', reference);

    alert("Payment successful!");
    window.location.href = "confirmation.html";

    
});


