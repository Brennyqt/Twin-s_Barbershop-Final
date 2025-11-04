



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Services | Twin's Barbershop and Jake's Tattoo</title>
    <link rel="icon" type="icon" href="Try Barbershop/twin.jpg">
    <link rel="stylesheet" href="./user.css/services.css">
</head>
<body>
    <nav>
        <div class="logo">Twin's Barbershop and Jake's Tattoo</div>
        <ul class="nav-links">
            <li><a href="homepage.php">Home</a></li>
            <li><a href="reservation.php">Make a Reservation</a></li>
            <li><a href="appointment.php">History</a></li>
            <li><a href="logout.php">Log Out</a></li>
        </ul>
    </nav>

    <main>
        <h2>Our Services</h2>
        <div class="services-list">
            <div class="service-card" onclick="location.href='reservation.php'">
            <h3>Haircut</h3>
            <p>₱130</p>
            </div>

            <div class="service-card" onclick="location.href='reservation.php'">
                <h3>Rebond</h3>
                <p>₱1,300</p>
            </div>
          
        
            <div class="service-card" onclick="location.href='reservation.php'">
                <h3>Small Tattoo</h3>
                <p>₱2,000</p>
            </div>
         
            <div class="service-card" onclick="location.href='reservation.php'">
                <h3>Big Tattoo</h3>
                <p>₱5,000</p>
            </div>
        </div>
        <a href="homepage.php" class="back-btn">Back</a>
    </main>

    <script src="/Try Barbershop/js/script.js"></script>
</body>
</html>