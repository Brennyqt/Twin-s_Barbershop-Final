<?php
session_start();
if (!isset($_SESSION['email'])) {
    header("Location: login.php");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard | Twin's Barbershop and Jake's Tattoo</title>
    <link rel="icon" type="icon" href="/Try Barbershop/twin.jpg">
    <link rel="stylesheet" href="./user.css/dash.css">

</head>
<body>
    <nav>
        <div class="logo">Twin's Barbershop and Jake's Tattoo</div>
        <ul class="nav-links">
        
            <li><a href="/website/services.php">Services</a></li>
            <li><a href="/website/reservation.php">Make a Reservation</a></li>
            <li><a href="/website/appointment.php">History</a></li>
            <li><a href="/website/logout.php">Log Out</a></li>
        </ul>
    </nav>
    <main>
        <div class="welcome">
            <h1>Welcome to Twin's Barbershop and Jake's Tattoo!</h1>
            <p>Your premium grooming and tattoo experience starts here.</p>
        </div>
    </main>
</body>
</html>