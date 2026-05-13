<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Debug log file
$debug_log = "ticket_debug_log.txt";

// Show errors during dev
ini_set("display_errors", 1);
error_reporting(E_ALL);

// Include DB config
include "../config.php";

// Get JSON input
$input = file_get_contents("php://input");
file_put_contents($debug_log, $input);  // Save raw request

$data = json_decode($input, true);

// Validate fields
if (
    empty($data['user_id']) ||
    empty($data['event_id']) ||
    empty($data['ticket_id']) ||
    empty($data['date']) ||
    !isset($data['price']) ||
    empty($data['qr_code'])
) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit();
}

// Decode QR image
$qrData = $data['qr_code'];
$qrImage = str_replace('data:image/png;base64,', '', $qrData);
$qrImage = str_replace(' ', '+', $qrImage);
$imageData = base64_decode($qrImage);

// Create folder for QR codes
$qrDir = "qr_codes";
if (!file_exists($qrDir)) {
    mkdir($qrDir, 0777, true);
}

$qrFilename = $qrDir . "/" . uniqid("qr_") . ".png";

// Save QR image
if (!file_put_contents($qrFilename, $imageData)) {
    echo json_encode(["status" => "error", "message" => "Failed to save QR code image"]);
    exit();
}

// Insert into DB
$stmt = $conn->prepare("INSERT INTO tickets (user_id, event_id, ticket_id, price, date, qr_code) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => "Prepare failed: " . $conn->error]);
    exit();
}

$stmt->bind_param("iissss", $data['user_id'], $data['event_id'], $data['ticket_id'], $data['price'], $data['date'], $qrFilename);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Ticket saved successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Execute failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>