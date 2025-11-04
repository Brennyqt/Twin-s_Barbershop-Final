<?php
session_start();
include("connection.php");

$email = $_SESSION["email"];
$message = "";

// ✅ Handle payment submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $method = $_POST["method"];
    $reference = !empty($_POST["reference"]) ? $_POST["reference"] : NULL;

    // ✅ Update user's payment info
    $update = "UPDATE register SET reference = ? WHERE email = ?";
    $stmt = $conn->prepare($update);
    $stmt->bind_param("ss", $reference, $email);

    if ($stmt->execute()) {
        $_SESSION["can_reserve"] = true; // allow access to reservation
        $message = "✅ Payment successful! You can now proceed to reservation.";
        echo "<script>
                alert('$message');
                window.location.href='reservation.php';
              </script>";
        exit;
    } else {
        $message = "❌ Payment failed. Try again later.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payment | Twin's Barbershop</title>
  <link rel="stylesheet" href="user.css/payment.css?v=1.0">
</head>
<body>

  <!-- Navbar -->
  <nav>
    <div class="logo">Twin's Barbershop</div>
    <ul class="nav-links">
      <li><a href="homepage.php">Home</a></li>
      <li><a href="payment.php" class="active">Payment</a></li>
      <li><a href="homepage.php">Profile</a></li>
    </ul>
  </nav>

  <!-- Centered payment box -->
  <div class="form-container">
    <div class="payment-card">
      <h2>Confirm Payment</h2>
      <form method="POST">
        <label>Downpayment: <strong>₱30.00</strong></label>

        <label>Payment Method:</label>
        <select name="method" required>
          <option value="">-- Select Method --</option>
          <option value="GCash">GCash</option>
          <option value="PayMaya">PayMaya</option>
          <option value="Cash">Cash</option>
        </select>

        <label>Reference Number:</label>
        <input type="text" name="reference" placeholder="e.g. GCash ref no.">

        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  </div>

</body>
</html>
