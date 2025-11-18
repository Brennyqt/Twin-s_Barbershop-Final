<?php
// admin.php
$servername = "localhost";
$username = "root";
$password = "pogiako2263";
$dbname = "twins_barbershop1";

// Prevent PHP warnings from breaking JSON
ini_set('display_errors', 0);
error_reporting(E_ALL);

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Handle Accept/Decline via AJAX
if(isset($_POST['action']) && isset($_POST['id'])){
    $email = $_POST['id']; // use email as unique identifier
    $status = $_POST['action'] === 'accept' ? 'Accepted' : 'Declined';

    $stmt = $conn->prepare("UPDATE register SET Status=? WHERE email=?");
    $stmt->bind_param("ss", $status, $email);
    $stmt->execute();

    // Fetch updated row
    $res = $conn->query("SELECT * FROM register WHERE email='".$conn->real_escape_string($email)."'")->fetch_assoc();

    if($res){
        echo json_encode([
            'success'=>true,
            'status'=>$status,
            'row'=>[
                'name'=>$res['first_name'].' '.$res['last_name'],
                'email'=>$res['email'],
                'date'=>$res['date'],
                'time'=>$res['time'],
                'service'=>$res['service'],
                'reference'=>$res['reference']
            ]
        ]);
    } else {
        echo json_encode(['success'=>false]);
    }

    $stmt->close();
    exit;
}

// Fetch pending and history
$pendingResult = $conn->query("SELECT * FROM register WHERE Status='Pending' ORDER BY date,time");
$historyResult = $conn->query("SELECT * FROM register WHERE Status IN ('Accepted','Declined') ORDER BY date DESC,time DESC");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="file:///C:/xampp/htdocs/website/admin/admin.css">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="admin.css"> <!-- Correct the path to your CSS file -->
<title>Twin's Barbershop Admin</title>
</head>
<body>
<h1>Twin's Barbershop Admin</h1>

<h2>Appointment Requests</h2>
<table border="1" cellpadding="5" cellspacing="0" id="pendingTable">
<thead>
<tr>
<th>Name</th><th>Email</th><th>Date</th><th>Time</th><th>Service</th><th>Reference</th><th>Status</th><th>Actions</th>
</tr>
</thead>
<tbody>
<?php if($pendingResult->num_rows > 0): ?>
    <?php while($row = $pendingResult->fetch_assoc()): ?>
    <tr data-id="<?php echo htmlspecialchars($row['email']); ?>"> 
        <td><?php echo htmlspecialchars($row['first_name'].' '.$row['last_name']); ?></td>
        <td><?php echo htmlspecialchars($row['email']); ?></td>
        <td><?php echo htmlspecialchars($row['date']); ?></td>
        <td><?php echo htmlspecialchars($row['time']); ?></td>
        <td><?php echo htmlspecialchars($row['service']); ?></td>
        <td><?php echo htmlspecialchars($row['reference']); ?></td>
        <td class="status"><?php echo htmlspecialchars($row['Status']); ?></td>
        <td>
            <button class="accept-btn">Accept</button>
            <button class="decline-btn">Decline</button>
        </td>
    </tr>
    <?php endwhile; ?>
<?php else: ?>
    <tr class="no-data"><td colspan="8" style="text-align:center;">No pending requests found</td></tr>
<?php endif; ?>
</tbody>
</table>

<h2>Appointment History</h2>
<table border="1" cellpadding="5" cellspacing="0" id="historyTable">
<thead>
<tr>
<th>Name</th><th>Email</th><th>Date</th><th>Time</th><th>Service</th><th>Reference</th><th>Status</th>
</tr>
</thead>
<tbody>
<?php if($historyResult->num_rows > 0): ?>
    <?php while($row = $historyResult->fetch_assoc()): ?>
    <tr>
        <td><?php echo htmlspecialchars($row['first_name'].' '.$row['last_name']); ?></td>
        <td><?php echo htmlspecialchars($row['email']); ?></td>
        <td><?php echo htmlspecialchars($row['date']); ?></td>
        <td><?php echo htmlspecialchars($row['time']); ?></td>
        <td><?php echo htmlspecialchars($row['service']); ?></td>
        <td><?php echo htmlspecialchars($row['reference']); ?></td>
        <td><?php echo htmlspecialchars($row['Status']); ?></td>
    </tr>
    <?php endwhile; ?>
<?php else: ?>
    <tr class="no-data"><td colspan="7" style="text-align:center;">No history found</td></tr>
<?php endif; ?>
</tbody>
</table>

<script>

// ===============================
// Handle Accept / Decline
// ===============================
function handleAction(button, action){
    const row = button.closest('tr');
    const email = row.dataset.id;

    fetch('admin.php', {
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        body:'id='+encodeURIComponent(email)+'&action='+encodeURIComponent(action)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.success){
            row.remove();

            const pendingBody = document.querySelector('#pendingTable tbody');
            if(pendingBody.rows.length === 0){
                const tr = document.createElement('tr');
                tr.className = 'no-data';
                tr.innerHTML = '<td colspan="8" style="text-align:center;">No pending requests found</td>';
                pendingBody.appendChild(tr);
            }

            const historyTable = document.querySelector('#historyTable tbody');
            const newRow = document.createElement('tr');
            newRow.classList.add('history-row');
            newRow.innerHTML = `
                <td>${data.row.name}</td>
                <td>${data.row.email}</td>
                <td>${data.row.date}</td>
                <td>${data.row.time}</td>
                <td>${data.row.service}</td>
                <td>${data.row.reference}</td>
                <td>${data.status}</td>
            `;

            const noData = historyTable.querySelector('.no-data');
            if(noData) noData.remove();

            historyTable.prepend(newRow);

            setupPagination(); // ⭐ refresh pages after adding new row
        } else {
            alert('Update failed');
        }
    })
    .catch(err=>{
        console.error('AJAX error:', err);
        alert('An error occurred. Check console.');
    });
}

document.querySelectorAll('.accept-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>handleAction(btn,'accept'));
});
document.querySelectorAll('.decline-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>handleAction(btn,'decline'));
});


// =============================================
// ⭐ ADD PAGINATION FOR HISTORY TABLE
// =============================================
const rowsPerPage = 5;
let currentPage = 1;

function setupPagination() {
    const rows = [...document.querySelectorAll('#historyTable tbody tr')];
    rows.forEach(r => r.style.display = ""); // reset display

    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    showPage(currentPage);

    createPaginationButtons(totalPages);
}

function showPage(page) {
    const rows = [...document.querySelectorAll('#historyTable tbody tr')];

    rows.forEach((row, index) => {
        row.style.display =
            index >= (page - 1) * rowsPerPage && index < page * rowsPerPage
                ? ""
                : "none";
    });
}

function createPaginationButtons(totalPages) {
    let container = document.getElementById("pagination");
    if (!container) {
        container = document.createElement("div");
        container.id = "pagination";
        container.style.textAlign = "center";
        container.style.marginTop = "15px";
        document.getElementById("historyTable").after(container);
    }

    container.innerHTML = "";

    // Prev button
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => {
        currentPage--;
        showPage(currentPage);
        createPaginationButtons(totalPages);
    };
    container.appendChild(prevBtn);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        btn.style.margin = "0 5px";
        btn.style.fontWeight = (i === currentPage) ? "bold" : "normal";

        btn.onclick = () => {
            currentPage = i;
            showPage(currentPage);
            createPaginationButtons(totalPages);
        };

        container.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => {
        currentPage++;
        showPage(currentPage);
        createPaginationButtons(totalPages);
    };
    container.appendChild(nextBtn);
}

// Start pagination when page loads
window.onload = setupPagination;

</script>

</body>
</html>
<?php $conn->close(); ?>
