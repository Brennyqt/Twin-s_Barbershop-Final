document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // You can add validation here if you want
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username && password) {
    // Redirect to home page after login
    window.location.href = "index.html";
  } else {
    alert("Please fill in both fields.");
  }
});
