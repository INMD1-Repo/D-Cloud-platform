<?php

//모듈 폴더 path정의
require(__DIR__ . '/../../vendor/autoload.php');

use Proxmox\Request;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);

$Proxmox_id = $_ENV["Proxmox_id"];
$Proxmox_Password = $_ENV["Proxmox_Password"];
$Proxmox_ip = $_ENV["Proxmox_ip"];

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$parameter = $_GET["search"] ?? null;

$configure = [
    'hostname' => $Proxmox_ip ,
    'username' => $Proxmox_id,
    'password' => $Proxmox_Password
];

try {
    Request::Login($configure); 

    switch ($parameter) {
        case 'nodes':
            http_response_code(200); 
            $response = Request::Request('/nodes', null, 'GET');
            echo json_encode($response);
            break;
        default:
            http_response_code(400); 
            echo json_encode(['error' => "No valid parameter provided!"]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500); 
    echo json_encode(['error' => $e->getMessage()]);
}