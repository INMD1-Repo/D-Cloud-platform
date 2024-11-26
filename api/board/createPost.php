<?php
error_reporting(E_ALL);

require(__DIR__ . '/../../vendor/autoload.php');


header('Content-Type: application/json');
setCorsHeaders();

// 환경 변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 연결
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $_ENV['DB_PORT']);

if ($conn->connect_error) {
    die(json_encode(['Error' => "데이터베이스 연결 실패: " . $conn->connect_error]));
}

$request_method = $_SERVER['REQUEST_METHOD'];

if ($request_method == 'GET') {
    echo json_encode(['message' => "I'm here"]);
} elseif ($request_method == 'POST') {
    handlePostRequest($conn);
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

$conn->close();

function handlePostRequest($conn)
{
    $input = json_decode(file_get_contents('php://input'), TRUE);
    $post_board = $_GET['board'];

    if ($post_board != "notice" && $post_board != "Suggestions") {
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        return;
    }

    if (!verifyAccess($conn, $input['Access'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        return;
    } else {
        if (!validateInput($input)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid input data']);
            return;
        } else {
            $query = "INSERT INTO $post_board (Username, title, content, User_email, created_at) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("sssss", $input['username'], $input['title'], $input['content'], $input['User_email'], date("Y-m-d H:i:s"));

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(['message' => 'Post created successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to create post: ' . $stmt->error]);
            }
            $stmt->close();
        }
    }
}

//데이터 잘 들어왔는지지
function validateInput($input)
{
    return !empty($input['username']) && !empty($input['title']) && !empty($input['content']) &&
        !empty($input['User_email']) && !empty($input['Access']);
}

//Access토큰 조회
function verifyAccess($conn, $access)
{
    $sql = "SELECT * FROM auth_session WHERE jwt_access = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $access);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    return $result->num_rows > 0;
}
?>