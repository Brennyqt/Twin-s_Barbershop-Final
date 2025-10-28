const loginForm = document.getElementById('loginForm');
const spinnerOverlay = document.getElementById('spinnerOverlay');
const loginCard = document.querySelector('.login-card');

// Fade in page + login card
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => loginCard.classList.add('show'), 300);
});

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('name').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if any field is empty
    if (email === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Check if it's a Gmail address (dapat correct ang @gmail.com)
    if (!email.includes('@gmail.com')) {
        alert("Please enter a valid Email address.");
        return;
    }

    // Show spinner
    spinnerOverlay.classList.add('active');

    // Simulate loading before redirect
    setTimeout(() => {
        spinnerOverlay.classList.remove('active');
        window.location.href = "dashboard.html";  
    }, 2500);
});
