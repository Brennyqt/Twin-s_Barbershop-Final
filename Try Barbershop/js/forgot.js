// Handle forgot password form
const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
    forgotForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Password reset link sent to your email!");
        window.location.href = "reset pass.html";
    });
}

// Handle reset password form
const resetForm = document.getElementById("resetForm");
if (resetForm) {
    resetForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        alert("Password has been reset successfully!");
        window.location.href = "login.html";
    });
}
