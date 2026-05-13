<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type");
  
    include "../config.php";
 
    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
    $password = $data->password;

    $sql = "SELECT * FROM organizers WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
    $org = $result->fetch_assoc();
    if (password_verify($password, $org['password'])) {
        echo json_encode(["status" => "success", "org" => ["id" => $org['id'], "name" => $org['name']]]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    }
    } else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
    }
?>
