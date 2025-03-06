<?php
// Establish database connection
$con = mysqli_connect('localhost', 'root', '', 'easeevent');

// Check connection
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$rating = $_POST['rating'];
$feedback = $_POST['feedbk']; // Corrected variable name

// Prepare the SQL query
$que = "INSERT INTO `feedback` (`name`, `email`, `rating`, `feedbk`) VALUES ('$name', '$email', '$rating', '$feedback')";

if (mysqli_query($con, $que)) {
    // Redirect if insert is successful
    header('Location: feedback.html');
    exit();
} else {
    echo "Error: " . $que . "<br>" . mysqli_error($con);
}

// Close the database connection
mysqli_close($con);
?>
