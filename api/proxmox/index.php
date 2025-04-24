<?php
declare(strict_types=1);

// error_reporting(E_ALL);
// ini_set('display_errors', '1');

// Composer autoload
require __DIR__ . '/../../vendor/autoload.php';

use Proxmox\Request;

// .env 환경변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad(); // safeLoad()는 .env 파일이 없어도 오류를 발생시키지 않음

// 환경 변수 가져오기 (널 체크 및 예외 처리)
$Proxmox_id = $_ENV["Proxmox_id"] ?? null;
$Proxmox_Password = $_ENV["Proxmox_Password"] ?? null;
$Proxmox_ip = $_ENV["Proxmox_ip"] ?? null;
$Proxmox_port = $_ENV["Proxmox_port"] ?? null;

// 필수 환경 변수 체크
if (!$Proxmox_id || !$Proxmox_Password || !$Proxmox_ip || !$Proxmox_port) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxmox 환경변수(.env)가 올바르게 설정되지 않았습니다.']);
    exit;
}

$configure = [
    'hostname' => $Proxmox_ip,
    'username' => $Proxmox_id,
    'password' => $Proxmox_Password,
    // 'realm'     => 'pam',
    'port' => $Proxmox_port
];

// 파라미터 사전 설정
$parameter = $_GET["search"] ?? null;
$Search_VM = $_GET["vmid"] ?? null;
$node = $_GET["node"] ?? null;
$type = $_GET["type"] ?? null;

header('Content-Type: application/json; charset=utf-8');

try {
    Request::Login($configure);

    switch ($parameter) {
        // 노드 시스템 현황
        case 'nodes':
            $response = Request::Request('/nodes', null, 'GET');
            http_response_code(200);
            echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            break;

        // 실시간 정보 수집
        case 'livedata':
            $ID = $_GET["id"] ?? null;
            if (!$node || !$type || !$ID) {
                http_response_code(400);
                echo json_encode(['error' => 'livedata 조회에 필요한 파라미터(node, type, id)가 부족합니다.']);
                break;
            }
            $endpoint = sprintf('/nodes/%s/%s/%s/status/current', $node, $type, $ID);
            $nodes = Request::Request($endpoint, null, 'GET');
            http_response_code(200);
            echo json_encode($nodes, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            break;

        default:
            http_response_code(400);
            echo json_encode(['error' => "No valid parameter provided!"]);
            break;
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
