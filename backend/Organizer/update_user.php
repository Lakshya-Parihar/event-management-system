<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");
include("../config.php");

$data = json_decode(file_get_contents("php://input"));

// Common validation
if (!isset($data->id)) {
    echo json_encode(["status" => "error", "message" => "Organizer ID is required."]);
    exit;
}

$id = $data->id;

// Change password request
if (isset($data->changePassword) && $data->changePassword === true) {
    if (!isset($data->currentPassword) || !isset($data->newPassword)) {
        echo json_encode(["status" => "error", "message" => "Incomplete password data."]);
        exit;
    }

    $currentPassword = $data->currentPassword;
    $newPassword = $data->newPassword;

    // Fetch hashed password from DB
    $stmt = $conn->prepare("SELECT password FROM organizers WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row['password'];

        if (password_verify($currentPassword, $hashedPassword)) {
            $newHashed = password_hash($newPassword, PASSWORD_DEFAULT);

            $updateStmt = $conn->prepare("UPDATE organizers SET password = ? WHERE id = ?");
            $updateStmt->bind_param("si", $newHashed, $id);
            if ($updateStmt->execute()) {
                echo json_encode(["status" => "success", "message" => "Password updated successfully."]);
            } else {
                echo json_encode(["status" => "error", "message" => "Failed to update password."]);
            }
            $updateStmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Current password is incorrect."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Organizer not found."]);
    }

    $stmt->close();
    $conn->close();
    exit;
}

// Update user info
if (
    !isset($data->name) ||
    !isset($data->email) ||
    !isset($data->phone) ||
    !isset($data->city) ||
    !isset($data->state)
) {
    echo json_encode(["status" => "error", "message" => "Incomplete profile data."]);
    exit;
}

$name = $data->name;
$email = $data->email;
$phone = $data->phone;
$city = $data->city;
$state = $data->state;

$stmt = $conn->prepare("UPDATE organizers SET name = ?, email = ?, phone = ?, city = ?, state = ? WHERE id = ?");
$stmt->bind_param("sssssi", $name, $email, $phone, $city, $state, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update profile."]);
}

$stmt->close();
$conn->close();
?>
