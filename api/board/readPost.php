<?php
// 환경 변수 및 기타 로드
require(__DIR__ . '/../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 및 JWT 설정
$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];

$conn = new mysqli($servername, $username, $password, $dbname, $port);

// 입력 데이터 및 요청 정보 수집
$input = json_decode(file_get_contents('php://input'), true);
$post_board = $_GET['board'] ?? null;
$los_board = $_GET['id'] ?? null;
$request_method = $_SERVER['REQUEST_METHOD'];

// 허용된 테이블 이름 목록 (화이트리스트)
$allowed_tables = ['notice', 'Suggestions'];

// 유효한 board 값인지 확인
if (!$post_board || !in_array($post_board, $allowed_tables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid board specified']);
    exit;
}

// 연결 오류 처리
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

if ($request_method === 'GET') {
    // 모든 데이터 로드
    if ($los_board === 'all') {
        $stmt = $conn->prepare("SELECT * FROM $post_board");
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(['error' => 'Database query preparation failed']);
            exit;
        }
        $stmt->execute();
        $result = $stmt->get_result();
        $total_record = [];

        while ($row = $result->fetch_assoc()) {
            $total_record[] = $row;
        }

        if (count($total_record) === 0) {
            http_response_code(400);
            echo json_encode(['error' => 'No Data']);
        } else {
            echo json_encode($total_record);
        }
        $stmt->close();

    } else {
        if (!is_numeric($los_board)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid ID specified']);
            exit;
        }

        $stmt = $conn->prepare("SELECT * FROM $post_board WHERE id = ?");
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(['error' => 'Database query preparation failed']);
            exit;
        }
        $stmt->bind_param("i", $los_board);
        $stmt->execute();
        $result = $stmt->get_result();
        $row = $result->fetch_assoc();

        if ($row === null) {
            http_response_code(404);
            echo json_encode(['error' => 'Record not found']);
        } else {
            echo json_encode($row);
        }
        $stmt->close();
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

$conn->close();
?>
