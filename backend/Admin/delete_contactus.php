<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "../config.php";

$data = json_decode(file_get_contents("php://input"));

if (isset($data->id)) {
    $id = intval($data->id);
    $sql = "DELETE FROM contactus WHERE id = $id";

    if ($conn->query($sql)) {
        echo json_encode(["success" => true, "message" => "Contact deleted successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Delete failed"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request"]);
}
$conn->close();
?>
