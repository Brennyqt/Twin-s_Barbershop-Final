<?php
include("connection.php");
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $email = $_POST["email"];
  $password = $_POST["password"];

  $query = "SELECT * FROM register WHERE email = ? AND user_type = 'user'";
  $stmt = $conn->prepare($query);
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $result = $stmt->get_result();

  if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();

    if (password_verify($password, $row['password'])) {
      $_SESSION["id"] = $row["id"]; // ✅ important
      $_SESSION["email"] = $row["email"];
      $_SESSION["first_name"] = $row["first_name"];
      $_SESSION["user_type"] = $row["user_type"];

     echo "<script>
alert('Login successful!');
window.location.href='http://localhost/website/homepage.php';
</script>";

    } else {
      echo "<script>alert('Incorrect password!');</script>";
    }
  } else {
    echo "<script>alert('Email not found!');</script>";
  }

  $stmt->close();
  $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login - Twin's Barbershop</title>
  <link rel="icon" href="twin.jpg">
  <link rel="stylesheet" href="./user.css/login.css">
</head>

<body>
  <div class="login-content-container">
    <div class="login-container">
      <form class="login-form" method="POST" action="">
        <h2>Login</h2>
        <div class="input-box">
          <label for="email">Email</label>
          <input type="text" id="email" name="email" required>

        </div>
        <div class="input-box">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" required>
        </div>
        <button type="submit">Login</button>
        <p class="signup-link">Don’t have an account? <a href="register.php">Sign up</a></p>
      </form>
    </div>
  </div>
</body>

</html>