<?php
include 'connection.php';

$sql = "SELECT * FROM allvendor";
$result = $con->query($sql);
$vendors = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $vendors[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($vendors);

$con->close();
?>
