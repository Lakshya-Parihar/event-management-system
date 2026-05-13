<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
 
include "../config.php";

$input = json_decode(file_get_contents("php://input"), true);
$status = isset($input['status']) ? $input['status'] : null;

if ($status) {
    $sql = "SELECT * FROM events WHERE status = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $status);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
} else {
    $sql = "SELECT * FROM events";
    $result = mysqli_query($conn, $sql);
}

$events = [];
$image_base_url = "http://localhost/EMS/backend/Organizer/";

while ($row = mysqli_fetch_assoc($result)) {
    $row['image'] = !empty($row['image']) ? $image_base_url . $row['image'] : null;
    $events[] = $row;
}

if (!empty($events)) {
    echo json_encode([
        "success" => true,
        "events" => $events
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "No events found"
    ]);
}
?>
