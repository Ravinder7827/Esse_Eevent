<?php
include 'connection.php';

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$type = $data['type'];
$location = $data['location'];
$image = $data['image'];

if (!empty($name) && !empty($type) && !empty($location) && !empty($image)) {
    $stmt = $con->prepare("INSERT INTO allvendor (name, type, location, image_url) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $type, $location, $image);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "All fields are required."]);
}

$con->close();
?>
