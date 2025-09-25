<?php
include("connection.php");
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email    = $_POST['email'];
    $password = $_POST['password'];

    // check if email exists
    $check = "SELECT * FROM register WHERE email = ? AND user_type = 'user'";
    $stmt  = $conn->prepare($check);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();

        // verify password
        if (password_verify($password, $user['password'])) {
            // login success
            $_SESSION['user_id']   = $user['Id'];
            $_SESSION['email']     = $user['email'];
            $_SESSION['user_type'] = $user['user_type'];

            echo "✅ Login successful!";
        } else {
            echo "❌ Incorrect password!";
        }
    } else {
        echo "❌ No user account found with that email!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Twin's Barber Shop</title>
    <link rel="stylesheet" href="/css/signup.css">
</head>
<body>
    <div class="register-container">
        <form class="register-form" action="login.php" method="post">
            <h2>Login</h2>

            <div class="input-box">
                <input type="email" name="email" required>
                <label>Email</label>
            </div>

            <div class="input-box">
                <input type="password" name="password" required>
                <label>Password</label>
            </div>

            <button type="submit" name="login">Login</button>
            <p class="login-link">Don’t have an account? <a href="register.php">Register</a></p>
        </form>
    </div>
</body>
</html>
