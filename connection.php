<?php
// Database configuration 
$servername = "localhost";
$username = "root";
$password = "";  // Default password for XAMPP
$dbname = "easeevent";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Optionally set character set
$conn->set_charset("utf8");

// Uncomment for debugging (optional)
// echo "Connected successfully"; 

// Remember to close the connection when done
?>
