<?php
//모듈 불려오기기
require(__DIR__ . '/../../vendor/autoload.php');

// header 설정
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // CORS 헤더 설정
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    header("Access-Control-Allow-Credentials: true");

    // HTTP 200 상태 반환
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// 환경 변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 및 JWT 설정
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];

$conn = new mysqli($servername, $name, $password, $dbname, $port);

$input = json_decode(file_get_contents('php://input'), TRUE);
$post_board = $_GET['board'];
$los_board = $_GET['id'];
$request_method = $_SERVER['REQUEST_METHOD'];

// 연결 오류 처리
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    return;
}

if ($request_method == 'GET') {
    //모든 데이터 로드
    switch ($los_board) {
        case 'all':
            if ($post_board == "notice" || $post_board == "Suggestions") {
                $stmt = $conn->prepare("SELECT * FROM $post_board");
                $stmt->execute();
                $result = $stmt->get_result();
                $total_record = array();

                while ($row = $result->fetch_assoc()) {
                    $total_record[] = $row;
                }

                $count = count($total_record);

                if ($count == 0) {
                    http_response_code(405);
                    echo json_encode(['error' => 'Method Not Allowed']);
                } else {
                    echo json_encode($total_record);
                }

            }
            break;
        default:
            $stmt = $conn->prepare("SELECT * FROM $post_board WHERE id = ?");
            $stmt->bind_param("i", $los_board);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            print (json_encode($row));
            break;
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>