<?php
// notes.php
$con = mysqli_connect('localhost', 'root', '', 'easeevent');
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $note = $_POST['note'];
    $sql = "INSERT INTO notes (content) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $note);
    $stmt->execute();
    $stmt->close();
}

// Retrieve notes
$sql = "SELECT * FROM notes";
$result = $conn->query($sql);
$notes = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $notes[] = $row;
    }
}

$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes</title>
    <link rel="stylesheet" href="style.css"> <!-- Include your CSS file -->
</head>
<body>
    <h1>My Notes</h1>
    <form action="notes.php" method="POST">
        <textarea name="note" rows="5" placeholder="Enter your note here..."></textarea>
        <button type="submit">Add Note</button>
    </form>
    <h2>Your Notes:</h2>
    <ul>
        <?php foreach ($notes as $note): ?>
            <li><?php echo htmlspecialchars($note['content']); ?></li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
