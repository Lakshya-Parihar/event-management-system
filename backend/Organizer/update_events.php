<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include("../config.php");

if (
    isset($_POST['id']) &&
    isset($_POST['title']) &&
    isset($_POST['short_description']) &&
    isset($_POST['description']) &&
    isset($_POST['date']) &&
    isset($_POST['category']) &&
    isset($_POST['venue']) &&
    isset($_POST['capacity']) &&
    isset($_POST['status']) &&
    isset($_POST['start_time']) &&
    isset($_POST['end_time'])
) {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $short_description = $_POST['short_description'];
    $description = $_POST['description'];
    $date = $_POST['date'];
    $category = $_POST['category'];
    $venue = $_POST['venue'];
    $capacity = $_POST['capacity'];
    $status = $_POST['status'];
    $start_time = $_POST['start_time'];
    $end_time = $_POST['end_time'];

    // Handle image (either uploaded or existing path)
    $image = '';

    if (isset($_FILES['image']) && $_FILES['image']['error'] === 0) {
        $uploadDir = "uploads/";
        $imageName =$_FILES["image"]["name"];
        $targetFile = $uploadDir . $imageName;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetFile)) {
            $image = $targetFile;
        } else {
            echo json_encode(["success" => false, "message" => "Image upload failed."]);
            exit;
        }
    } elseif (isset($_POST['existingImage'])) {
        $image = $_POST['existingImage'];
    } else {
        echo json_encode(["success" => false, "message" => "No image provided."]);
        exit;
    }

    $query = "UPDATE events SET 
                title = ?, 
                short_description = ?, 
                description = ?, 
                date = ?, 
                category = ?, 
                image = ?, 
                venue = ?, 
                capacity = ?, 
                status = ?, 
                start_time = ?, 
                end_time = ?
              WHERE id = ?";

    $stmt = $conn->prepare($query);
    $stmt->bind_param(
        "sssssssssssi",
        $title,
        $short_description,
        $description,
        $date,
        $category,
        $image,
        $venue,
        $capacity,
        $status,
        $start_time,
        $end_time,
        $id
    );

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Event updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to update event."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
}
