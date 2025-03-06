<?php
include 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['guest-name'];
    $family_name = $_POST['guest-family'];
    $phone_number = $_POST['guest-table'];
    $age = $_POST['guest-main-course'];
    $comment = $_POST['guest-comment'];

    $stmt = $conn->prepare("INSERT INTO guests (name, family_name, phone_number, age, comment) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssis", $name, $family_name, $phone_number, $age, $comment); // 'sssis' specifies the types of the parameters

    if ($stmt->execute()) {
        // Redirect back to the form or another page after successful insertion
        header("Location: editguest.html");
        exit;
    } else {
        echo "Error adding guest: " . $stmt->error;
    }

    $stmt->close();
}
$conn->close();
?>
