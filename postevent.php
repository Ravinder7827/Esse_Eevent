<?php
include 'connection.php';

// Check if form was submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $comment = $_POST['comment'];
    
    foreach ($_FILES['files']['name'] as $key => $name) {
        $file_tmp = $_FILES['files']['tmp_name'][$key];
        $file_size = $_FILES['files']['size'][$key];
        
        // Specify the directory to save uploaded files
        $upload_dir = 'uploads/'; // Ensure this directory exists and is writable
        $file_path = $upload_dir . basename($name);
        
        // Check file size limit (20MB)
        if ($file_size > 20 * 1024 * 1024) {
            echo "File $name exceeds the size limit of 20MB.";
            continue; // Skip to the next file
        }
        
        // Move uploaded file to the specified directory
        if (move_uploaded_file($file_tmp, $file_path)) {
            // Prepare an SQL statement
            $stmt = $con->prepare("INSERT INTO uploads (comment, file_name, file_size) VALUES (?, ?, ?)");
            $stmt->bind_param("ssi", $comment, $name, $file_size);
            
            // Execute the statement
            if ($stmt->execute()) {
                echo "File $name uploaded successfully.";
            } else {
                echo "Error uploading file $name: " . $con->error;
            }
            
            // Close the statement
            $stmt->close();
        } else {
            echo "Failed to move uploaded file $name.";
        }
    }
}

// Close the connection
$con->close();
?>
