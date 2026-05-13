<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "../config.php";

$sql = "SELECT * FROM contactus ORDER BY created_at DESC";
$result = $conn->query($sql);

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
