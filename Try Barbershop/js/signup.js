document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Redirect to home page after successful registration
  window.location.href = "index.html";
});
