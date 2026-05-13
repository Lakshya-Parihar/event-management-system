<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");
 
include '../config.php';

$sql = "SELECT * FROM organizers";
$result = $conn->query($sql);

$organizers = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $organizers[] = $row;
    }
    echo json_encode(['success' => true, 'orgs' => $organizers]);
} else {
    echo json_encode(['success' => false, 'message' => 'No users found']);
}

$conn->close();
?>
