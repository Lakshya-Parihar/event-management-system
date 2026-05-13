<?php
// check_ticket.php

// Enable CORS if needed (adjust origin as necessary)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection parameters — update these!
include "../config.php";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Read raw POST data and decode JSON
    $input = json_decode(file_get_contents('php://input'), true);

    if (!isset($input['user_id']) || !isset($input['event_id'])) {
        echo json_encode([
            "status" => "error",
            "message" => "Missing user_id or event_id"
        ]);
        exit;
    }

    $user_id = $input['user_id'];
    $event_id = $input['event_id'];

    // Prepare SQL to check if ticket exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM tickets WHERE user_id = :user_id AND event_id = :event_id");
    $stmt->execute([
        ":user_id" => $user_id,
        ":event_id" => $event_id,
    ]);

    $count = $stmt->fetchColumn();

    if ($count > 0) {
        echo json_encode([
            "status" => "exists",
            "message" => "Ticket already booked"
        ]);
    } else {
        echo json_encode([
            "status" => "not_exists",
            "message" => "No existing ticket found"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error: " . $e->getMessage()
    ]);
    exit;
}
