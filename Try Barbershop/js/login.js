const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple validation (for demo; replace with real backend auth)
    if (username === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }


    // Redirect to dashboard
    window.location.href = "dashboard.html";
});
