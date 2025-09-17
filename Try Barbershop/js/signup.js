const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Simple email validation
    if (!email.includes('@gmail.com')) {
        alert("Please enter a valid Gmail address.");
        return;
    }

    alert("Sign Up successful!");
    window.location.href = "dashboard.html";
});
