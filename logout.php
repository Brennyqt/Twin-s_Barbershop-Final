<?php
session_start();

// ✅ Destroy all session data
session_unset();
session_destroy();

// ✅ Redirect back to login page
echo "<script>
        alert('You have been logged out successfully.');
        window.location.href = 'login.php';
      </script>";
exit;
?>
