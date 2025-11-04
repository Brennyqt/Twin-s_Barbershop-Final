<?php
session_start();
include("connection.php");
if (!isset($_SESSION["can_reserve"]) || $_SESSION["can_reserve"] !== true) {
    echo '
    <style>
      .custom-alert {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      .custom-alert-box {
        background: #fff;
        color: #333;
        padding: 25px 30px;
        border-radius: 12px;
        text-align: center;
        max-width: 350px;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        animation: pop 0.3s ease-out;
      }
      .custom-alert-box h2 {
        color: #e11d48;
        margin: 0 0 10px;
      }
      .custom-alert-box p {
        margin-bottom: 20px;
      }
      .custom-alert-box button {
        background: #06b6d4;
        border: none;
        color: #fff;
        padding: 10px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: 0.2s;
      }
      .custom-alert-box button:hover {
        background: #0891b2;
      }
      @keyframes pop {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    </style>

    <div class="custom-alert" id="alertBox">
      <div class="custom-alert-box">
        <h2>⚠️ Payment Required</h2>
        <p>Please complete your payment before making a reservation.</p>
        <button onclick="window.location.href=\'payment.php\'">Go to Payment</button>
      </div>
    </div>
    ';
    exit;
}



$email = $_SESSION["email"];
$message = "";

// ✅ Handle reservation submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $service = $_POST["service"];
    $date = $_POST["date"];
    $time = $_POST["time"];

    // ✅ Check if slot already taken
    $check = "SELECT * FROM register WHERE date = ? AND time = ?";
    $stmt = $conn->prepare($check);
    $stmt->bind_param("ss", $date, $time);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $message = "❌ Sorry, that date and time are already reserved.";
    } else {
        // ✅ Save reservation
        $update = "UPDATE register SET service = ?, date = ?, time = ? WHERE email = ?";
        $stmt = $conn->prepare($update);
        $stmt->bind_param("ssss", $service, $date, $time, $email);

        if ($stmt->execute()) {
            unset($_SESSION["can_reserve"]); // prevent reusing payment
            $message = "✅ Reservation successful! See you soon.";
        } else {
            $message = "❌ Reservation failed: " . $stmt->error;
        }
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Reservation - Twin's Barbershop</title>
<style>
body { font-family: Arial; background: #f8f8f8; margin: 40px; }
form { background: white; padding: 25px; border-radius: 10px; max-width: 400px; margin: auto; }
button { margin-top: 15px; padding: 10px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
button:hover { background: #1f7a32; }
.message { margin-bottom: 10px; font-weight: bold; color: green; text-align: center; }
.error { color: red; text-align: center; }
</style>
</head>
<body>

<h2 align="center">💈 Make a Reservation</h2>

<?php if ($message) echo "<p class='message'>$message</p>"; ?>

<form method="POST">
    <label>Service:</label><br>
    <select name="service" required>
        <option value="">-- Select Service --</option>
        <option value="Haircut">Haircut - ₱150</option>
        <option value="Rebond">Rebond - ₱2000</option>
        <option value="Massage">Massage - ₱300</option>
        <option value="Tattoo Small">Tattoo Small - ₱500</option>
        <option value="Tattoo Medium">Tattoo Medium - ₱800</option>
        <option value="Tattoo Big">Tattoo Big - ₱1500</option>
    </select><br><br>

    <label>Date:</label><br>
    <input type="date" name="date" required><br><br>

    <label>Time:</label><br>
    <input type="time" name="time" required><br><br>

    <button type="submit">Reserve Now</button>
  
</form>
<a href="homepage.php" class="back-btn">⬅ Back to Home</a>


</body>
</html>
