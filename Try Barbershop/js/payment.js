// ----------------------------
// PAYMENT QR TOGGLE
// ----------------------------
function updatePaymentUI() {
    const method = document.getElementById('method').value;
    const qrContainer = document.getElementById('qr-container');
    const qrImage = document.getElementById('qr-image');
    const referenceInput = document.getElementById('reference');

    if (method === 'Cash') {
        qrContainer.style.display = 'block';
        qrImage.src = '../qr1.jpg';
        referenceInput.placeholder = 'Enter Reference Number';
    } 
    else if (method === 'GCash') {
        qrContainer.style.display = 'block';
        qrImage.src = '../qr1.jpg';
        referenceInput.placeholder = 'Enter GCash Reference Number';
    } 
    else {
        qrContainer.style.display = 'none';
        referenceInput.value = '';
    }
}


// ----------------------------
// PAYMENT FORM VALIDATION
// ----------------------------
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

    // Save data
    localStorage.setItem('paymentMethod', method);
    localStorage.setItem('paymentReference', reference);
    localStorage.setItem('downpayment', downpayment);

    // Success redirect
    alert(`Payment successful!\nMethod: ${method}\nDownpayment: ₱${downpayment}`);
    window.location.href = "confirmation.html";
});


// ----------------------------
// NAV DROPDOWNS
// ----------------------------
const notifToggle = document.querySelector(".notification-toggle");
const notifDropdown = document.querySelector(".notification-dropdown");

const accountToggle = document.querySelector("#accountToggle");
const accountDropdown = document.querySelector(".dropdown-menu");

if (notifToggle) {
    notifToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle("show");
        accountDropdown.classList.remove("show");
    });
}

if (accountToggle) {
    accountToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        accountDropdown.classList.toggle("show");
        if (notifDropdown) notifDropdown.classList.remove("show");
    });
}

document.addEventListener("click", () => {
    if (notifDropdown) notifDropdown.classList.remove("show");
    accountDropdown.classList.remove("show");
});


// ----------------------------
// MOBILE MENU TOGGLE
// ----------------------------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
