

<?php 
    // information
    // save sa database
    //1. Store sa variable
    //2.  CONNECT
    //SAVE : insert into 
   include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get and trim POST data
    $user = trim($_POST['username']);
    $email = trim($_POST['email']);
    $pass = trim($_POST['password']);

    if (!empty($user) && !empty($email) && !empty($pass)) {

        // Hash the password for security
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        // SQL query
        $sql = "INSERT INTO Users (username, email, password) 
                VALUES ('$user', '$email', '$hashedPass')";

        if ($conn->query($sql) === TRUE) {
            echo "Successful!";
        } else {
            echo "Error: " . $conn->error;
        }

    } else { 
        echo "All fields are required";
    }
}

$conn->close();
?>
