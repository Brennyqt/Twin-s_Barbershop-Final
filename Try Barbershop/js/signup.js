const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const firstname = document.getElementById('firstname').value.trim();
    const lastname= document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!firstname || !lastname || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    if (!email.includes('@gmail.com')) {
        alert("Please enter a valid Gmail address.");
        return;
    }

    alert("Sign Up successful!");
    window.location.href = "login.html";
});
