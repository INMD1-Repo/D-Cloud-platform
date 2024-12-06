<?php
// error_reporting(E_ALL);
// ini_set('display_errors', '1');
//모듈 폴더 path정의
require(__DIR__ . '/../../vendor/autoload.php');

use Proxmox\Request;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$Proxmox_id = $_ENV["Proxmox_id"];
$Proxmox_Password = $_ENV["Proxmox_Password"];
$Proxmox_ip = $_ENV["Proxmox_ip"];
$Proxmox_port = $_ENV["Proxmox_port"];

$configure = [
    'hostname' => $Proxmox_ip,
    'username' => $Proxmox_id,
    'password' => $Proxmox_Password,
    // 'realm'     => 'pam',
    'port' => $Proxmox_port
];

//파라미터 사전 설정
//큰틀
$parameter = $_GET["search"] ?? null;

//VM을 조회시 어떤 VM을 조회할지 가져오기 
$Search_VM = $_GET["vmid"] ?? null;

//실시간 데이터조회를 위한
$node = $_GET["node"] ?? null;
$type = $_GET["type"] ?? null;

try {
    Request::Login($configure);
    switch ($parameter) {
        //노드 시스템 현황 보여주는 코드
        case 'nodes':
            http_response_code(200);
            $response = Request::Request('/nodes', null, 'GET');
            echo json_encode($response);
            break;

        // //각 VM 별정보 제공을 함
        // case 'Status-VM':
        //     $nodes = Request::Request('/cluster/resources', null, 'GET');
        //     $jsonString = json_encode($nodes);
        //     $decodedArray = json_decode($jsonString, true);

        //     $result = array_filter($decodedArray["data"], function ($item) use ($Search_VM) {
        //         return $item['vmid'] === (int) $Search_VM;
        //     });
            
        //     if ($result == []) {
        //         http_response_code(404);
        //         echo json_encode($result);
        //     } else {
        //         http_response_code(200);
        //         echo json_encode($result);
        //     }
        //     break;
        //실시간 정보 수집
        case 'livedata':
            $ID = $_GET["id"] ?? null;
            //{node}/qemu/{vmid}/status/current
            $nodes = Request::Request('/nodes/'. $node .'/'. $type . '/'. $ID .'/status/current', null, 'GET');
            echo json_encode($nodes);
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