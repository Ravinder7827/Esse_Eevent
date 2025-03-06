<?php
// Database connection parameters
$host = "localhost";
$username = "root"; // Default username for XAMPP
$password = ""; // Default password for XAMPP is empty
$database = "easeevent"; // Correct database name

// Create a new mysqli connection
$mysqli = new mysqli($host, $username, $password, $database);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Prepare SQL statement
    $stmt = $mysqli->prepare("SELECT password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    // Check if the user exists
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed_password);
        $stmt->fetch();

        // Verify the password
        if (password_verify($password, $hashed_password)) {
            // Successful login
            session_start();
            $_SESSION['email'] = $email; // Store user information in session
            echo "Login successful!";
            // Log the login event
            $stmt = $mysqli->prepare("INSERT INTO login (user) VALUES (?)");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->close();
            // Redirect to a different page (e.g., dashboard)
            header("Location: index.html");
            exit();
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No account found with that email.";
    }

    // Close the statement
    $stmt->close();
}

// Close the database connection
$mysqli->close();
?>
