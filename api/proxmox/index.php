<?php

//모듈 폴더 path정의
require(__DIR__ . '/../../vendor/autoload.php');

use Proxmox\Request;


$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$Proxmox_id = $_ENV["Proxmox_id"];
$Proxmox_Password = $_ENV["Proxmox_Password"];
$Proxmox_ip = $_ENV["Proxmox_ip"];

$configure = [
    'hostname' =>  $Proxmox_ip,
    'username' =>  $Proxmox_id,
    'password' =>  $Proxmox_Password 
];

//특정하기
$parameter = $_GET["search"] ?? null;
//VM을 조회시 어떤 VM을 조회할지 가져오기 
$parameterd = $_GET["vmid"] ?? null;

try {
    Request::Login($configure); 
    switch ($parameter) {
        case 'nodes':
            http_response_code(200); 
            $response = Request::Request('/nodes', null, 'GET');
            echo json_encode($response);
            break;
        case 'Status-VM':
            $nodes = Request::Request('/nodes', null, 'GET');
            $json = json_decode($nodes);
            echo  $json -> data ;
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