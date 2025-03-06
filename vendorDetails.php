<?php
// Database connection
$con = mysqli_connect('localhost', 'root', '', 'easeevent');
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST['Name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $state = $_POST['state'] ?? '';
    $city = $_POST['city'] ?? '';
    $category = $_POST['category'] ?? '';
    $about = $_POST['comment'] ?? '';

    // Initialize uploaded files array
    $uploadedFiles = [];

    // Handle file uploads
    if (isset($_FILES['photos'])) {
        $photos = $_FILES['photos'];
        $uploadDir = 'uploads/'; // Make sure this directory is writable

        // Check if the upload directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        foreach ($photos['tmp_name'] as $key => $tmpName) {
            $fileName = basename($photos['name'][$key]);
            $targetFilePath = $uploadDir . $fileName;

            // Upload file to server
            if (move_uploaded_file($tmpName, $targetFilePath)) {
                $uploadedFiles[] = $targetFilePath; // Save the file path to the array
            } else {
                echo "Error uploading file: " . $photos['name'][$key];
                exit; // Stop execution on error
            }
        }
    }

    // Prepare SQL statement
    $sql = "INSERT INTO vendors (name, email, phone, state, city, category, notes, photos)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

    // Use prepared statements to prevent SQL injection
    $stmt = $con->prepare($sql);
    $photosString = implode(',', $uploadedFiles); // Convert to comma-separated string

    if ($stmt) {
        $stmt->bind_param("ssssssss", $name, $email, $phone, $state, $city, $category, $about, $photosString);
        
        if ($stmt->execute()) {
            echo "New vendor registered successfully!";
            // Redirect after 5 seconds
            header("refresh:5;url=index.html");
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close(); // Close the statement
    } else {
        echo "Error preparing statement: " . $con->error;
    }
}

$con->close(); // Close the database connection
?>
