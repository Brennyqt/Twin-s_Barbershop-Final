<?php
include("connection.php");
session_start();

if (!isset($_SESSION["email"])) {
    header("Location: homepage.php");
    exit;
}

$email = $_SESSION["email"];

// ✅ Get all appointments by this user
$query = "SELECT service, date, time FROM register WHERE email = ? AND date IS NOT NULL ORDER BY id DESC";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$appointments = [];
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}
$stmt->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Appointment History | Twin's Barbershop</title>
   <link rel="stylesheet" href="user.css/appointment.css?v=1.0">

</head>
<body>

<div class="container">
    <h2>My Appointment History</h2>

    <?php if (count($appointments) > 0) : ?>
        <table>
            <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Time</th>
            </tr>
            <?php foreach ($appointments as $a): ?>
                <tr>
                    <td><?= htmlspecialchars($a['service']) ?></td>
                    <td><?= htmlspecialchars($a['date']) ?></td>
                    <td><?= htmlspecialchars($a['time']) ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    <?php else: ?>
        <p style="text-align:center; color:#666;">No appointments yet.</p>
    <?php endif; ?>

    <div class="back">
        <a href="homepage.php" class="back-btn">⬅ Back</a>
    </div>
</div>

</body>
</html>

