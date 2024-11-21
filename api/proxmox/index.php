<?php

//모듈 폴더 path정의
require(__DIR__ . '/../../vendor/autoload.php');

use Proxmox\Request;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

$parameter = $_GET["search"] ?? null;

$configure = [
    'hostname' => '10.10.2.1',
    'username' => 'aksmdncc',
    'password' => "kcearqjtnjv5rvy7wegkdgilexocli0m58kcaffsnk6ywpge81"
];

try {
    Request::Login($configure); 

    switch ($parameter) {
        case 'nodes':
            $response = Request::Request('/nodes', null, 'GET');
            echo json_encode($response);
            break;

        default:
            echo json_encode(['error' => "No valid parameter provided!"]);
            break;
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
}