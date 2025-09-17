<?php
include("db.php");

session_start();

$error = "";
if ($_SERVER[REQUEST_METHOD] == 'POST') {
$user = trim( $_POST['username']);
$user = trim( $_POST['password']);

if (empty)($username) || empty($pasword) {
    $error .= 'Please enter your email/password';
}else {
    $stms = $pdo->prepare ("SELECT id username,password FROM user WHERE username =?");
    $stms->execute{[$username]};
    $user = $stms->fetch();

if ($user && password_verfify($password, $user ['password'])) {
    $_SESSION['username'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    exit;
}else{
    $error .= 'Invalid username or password';
    }
      }

       }

?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="twin.jpg">
  <title>Login - Twin's Barber Shop</title>
  <link rel="stylesheet" href="/css/login.css">
  <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar">
    <ul>
      <li><a href="index.html"><i class="fa-solid fa-house"></i> Home</a></li>
      <li><a href="services.html"><i class="fa-solid fa-scissors"></i> Services</a></li>
      <li><a href="about us.html"><i class="fa-solid fa-circle-info"></i> About Us</a></li>
      <li><a href="pricing.html"><i class="fa-solid fa-tags"></i> Pricing</a></li>
      <li><a href="login.html"><i class="fa-solid fa-right-to-bracket"></i> Login</a></li>
    </ul>
  </nav>

  <!-- Login Form -->
  <div class="login-container">
    <form class="login-form" id="loginForm">
      <h2>Login</h2>
      <div class="input-box">
        <input type="text" id="username" required>
        <label for="username">Username</label>
      </div>
      <div class="input-box">
        <input type="password" id="password" required>
        <label for="password">Password</label>
      </div>
      <button type="submit">Login</button>
      <p class="signup-link">Don’t have an account? <a href="signup.html">Sign up</a></p>
    </form>
  </div>

  <script src="login.js"></script>
</body>
</html>