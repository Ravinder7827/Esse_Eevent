<?php
// Database connection parameters
$con = mysqli_connect('localhost', 'root', '', 'easeevent');

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate required POST variables
    if (isset($_POST['name'], $_POST['email'], $_POST['password'], $_POST['accountType'])) {
        $name = trim($_POST['name']);
        $email = trim($_POST['email']);
        $password = password_hash(trim($_POST['password']), PASSWORD_BCRYPT);  // Hash the password
        $accountType = $_POST['accountType'];

        // Check if all fields are filled
        if (empty($name) || empty($email) || empty($password) || empty($accountType)) {
            echo "Please fill in all fields.";
        } else {
            // Prepare SQL to insert data using prepared statements
            $stmt = $con->prepare("INSERT INTO users (name, email, password, account_type) VALUES (?, ?, ?, ?)");
            if ($stmt) {
                $stmt->bind_param("ssss", $name, $email, $password, $accountType);

                // Execute the statement
                if ($stmt->execute()) {
                    echo "New record created successfully";
                    // Redirect to login page
                    header("Location: login.html");
                    exit();
                } else {
                    echo "Error: " . $stmt->error;
                }

                $stmt->close();
            } else {
                echo "Database query preparation failed.";
            }
        }
    } else {
        echo "Please fill in all fields.";
    }
}

$con->close();
?>
