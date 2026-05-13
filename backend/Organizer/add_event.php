<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include '../config.php';

// Receive POST data
$title = $_POST['title'] ?? '';
$date = $_POST['date'] ?? '';
$starttime = $_POST['start_time'] ?? '';
$endtime = $_POST['end_time'] ?? '';
$venue = $_POST['venue'] ?? '';
$short_description = $_POST['short_description'] ?? '';
$description = $_POST['description'] ?? '';
$category = $_POST['category'] ?? '';
$capacity = $_POST['capacity'] ?? '';
$status = $_POST['status'] ?? '';

// Image Upload
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $imageTmpPath = $_FILES['image']['tmp_name'];
    $imageName = $_FILES['image']['name']; // Unique filename
    $uploadDir = 'uploads/';
    $uploadPath = $uploadDir . $imageName;

    // Ensure the uploads directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    if (move_uploaded_file($imageTmpPath, $uploadPath)) {
        $imageURL = $uploadPath;
    } else {
        echo json_encode(["success" => false, "message" => "Image upload failed"]);
        exit();
    }
} else {
    echo json_encode(["success" => false, "message" => "No image uploaded or upload error: " . $_FILES['image']['error']]);
    exit();
}

// Insert into the database
$stmt = $conn->prepare("INSERT INTO events (title, date, start_time, end_time, venue, short_description, description, category, capacity, status, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssssssss", $title, $date, $starttime, $endtime, $venue, $short_description, $description, $category, $capacity, $status, $imageURL);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Event added successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
