

<?php 

    // DETAILS ABOUT SA DATABASE MO / SETUP DATABASE
    $servername = "localhost";
    $username = "root";      // your DB username
    $password = "pogiako2263";           // your DB password
    $dbname = "twins_barbershop";

    // Connect to database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("❌ Connection failed: " . $conn->connect_error);
    } else {
        echo "✅ Connected successfully to the database!";
    }

?>

