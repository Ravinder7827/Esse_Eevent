<?php
$con = mysqli_connect('localhost', 'root', '', 'easeevent');
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $eventDate = $_POST['eventDate'];
    $eventLocation = $_POST['eventLocation'];
    $receptionDescription = $_POST['receptionDescription'];

    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO event (event_date, event_location, reception_description) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $eventDate, $eventLocation, $receptionDescription);

    // Execute the statement
    if ($stmt->execute()) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
}

$conn->close();
?>
