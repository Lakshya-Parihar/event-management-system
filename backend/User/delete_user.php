<?php
header("Content-Type: application/json");
include("../config.php");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "User ID is required."]);
    exit;
}

$id = $data->id;

// Delete query
$query = "DELETE FROM users WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User deleted successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to delete user."]);
}

$stmt->close();
$conn->close();
?>
