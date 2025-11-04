<?php
include("connection.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name  = $_POST['first_name'];
    $last_name   = $_POST['last_name'];
    $email       = $_POST['email'];
    $password    = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $user_type   = "user"; 
    $service     = "None";
    $reference   = NULL;

    // Check if email already exists
    $check = "SELECT * FROM register WHERE email = ?";
    $stmt = $conn->prepare($check);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "<script>alert('Email already exists!');</script>";
    } else {
        // Insert new user
        $insert = "INSERT INTO register (first_name, last_name, email, password, user_type, service, reference)
                   VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($insert);
        $stmt->bind_param("sssssss", $first_name, $last_name, $email, $password, $user_type, $service, $reference);

        if ($stmt->execute()) {
            echo "<script>alert('Registration successful!'); window.location.href='login.php';</script>";
        } else {
            echo "Error: " . $stmt->error;
        }
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
  <link rel="icon" href="twin.jpg">
  <title>Register - Twin's Barber Shop</title>

  <!-- ✅ Correct CSS Path -->
  <link rel="stylesheet" href="user.css/signup.css">



  <script src="https://kit.fontawesome.com/your-fontawesome-kit.js" crossorigin="anonymous"></script>
</head>
<body>
  <main>
    <form class="signup-card" id="registerForm" method="POST" action="">
      <h2>Register</h2>

      <div class="input-box">
         <label for="first_name">First Name</label>
        <input type="text" id="first_name" name="first_name" required>
       
      </div>

      <div class="input-box">
         <label for="last_name">Last Name</label>
        <input type="text" id="last_name" name="last_name" required>
       
      </div>

      <div class="input-box">
         <label for="email">Email</label>
        <input type="text" id="email" name="email" required>
       
      </div>

      <div class="input-box">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" required>
        
      </div>

      <button type="submit">Register</button>
      <p>Already have an account? <a href="login.php">Login</a></p>
    </form>
  </main>
</body>

</html>
