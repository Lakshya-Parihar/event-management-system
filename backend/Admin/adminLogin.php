<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

require 'vendor/autoload.php'; // include Composer autoloader
use \Firebase\JWT\JWT;

$secretKey = "your_secret_key"; // Keep this secret

include "../config.php";

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email) || !isset($data->password)) {
    echo json_encode(["message" => "Email and Password are required"]);
    exit();
}

$email = $data->email;
$password = $data->password;

$sql = "SELECT * FROM admin WHERE email = '$email' LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 1) {
    $admin = $result->fetch_assoc();

    if (password_verify($password, $admin['password'])) {
        // You could also generate a JWT token here

        $payload = [
            "iss" => "http://localhost", // issuer
            "aud" => "http://localhost",
            "iat" => time(), // issued at
            "exp" => time() + (60 * 60), // expires in 1 hour
            "data" => [
                "id" => $admin['id'],
                "username" => $admin['username'],
                "email" => $admin['email']
            ]
        ];
 
        $jwt = JWT::encode($payload, $secretKey, 'HS256');

        echo json_encode([
            "message" => "Login successful",
            "success" => true,
            "token" => $jwt,
            "id" => $admin['id']
        ]);
    } else {
        echo json_encode(["message" => "Invalid password", "success" => false]);
    }
} else {
    echo json_encode(["message" => "Admin not found", "success" => false]);
}

$conn->close();
?>
