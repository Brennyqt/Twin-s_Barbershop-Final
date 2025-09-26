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

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === "" || password === "") {
        alert("Please fill in all fields.");
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
