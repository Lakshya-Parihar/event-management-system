<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

include "../config.php";

$data = json_decode(file_get_contents("php://input"));

$name = $data->name ?? '';
$gender = $data->gender ?? '';
$email = $data->email ?? '';
$password = $data->password ?? '';
$city = $data->city ?? '';
$state = $data->state ?? '';
$phone = $data->phone ?? '';
$status = 'Active';

if (!$name || !$gender || !$email || !$password || !$phone || !$city) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$passwordHash = password_hash($password, PASSWORD_DEFAULT);

// Check if email already exists
$checkSql = "SELECT id FROM users WHERE email = ?";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("s", $email);
$checkStmt->execute();
$checkStmt->store_result();

if ($checkStmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Email already registered"]);
    $checkStmt->close();
    exit;
}
$checkStmt->close();

// Insert new user
$sql = "INSERT INTO users (name, gender, email, password, phone, city, state, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $name, $gender, $email, $passwordHash, $phone, $city, $state, $status);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "User registered"]);
} else {
    echo json_encode(["status" => "error", "message" => "Something went wrong"]);
}
$stmt->close();
$conn->close();
?>
