<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Headers: Content-Type");
  
    include "../config.php";
 
    $data = json_decode(file_get_contents("php://input"));

    $email = $data->email;
    $password = $data->password;

    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "user" => ["id" => $user['id'], "name" => $user['name']]]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password"]);
    }
    } else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
    }
?>
