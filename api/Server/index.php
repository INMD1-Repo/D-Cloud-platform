<?php
require(__DIR__ . '/../../vendor/autoload.php');

header('Content-Type: application/json');

// 환경 변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 연결
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $_ENV['DB_PORT']);

if ($conn->connect_error) {
    die(json_encode(['Error' => "데이터베이스 연결 실패: " . $conn->connect_error]));
}

$request_method = $_SERVER['REQUEST_METHOD'];
// 샘픓
// {
//     "name": "sadasdasd",
//     "email": "lyw514549@gmail.com",
//     "phone_number": "asdasdasdasdasd",
//     "Application_period": "",
//     "Reason_for_renta": "asdsadadas",
//     "Servername": "asdasdasd",
//     "Username": "asdasdasdasd",
//     "User_pw": "asdasdasda",
//     "root_pw": "asdasdasd",
//     "Network_Requirements": "asdasdas",
//     "iamcheck": true,
//     "os": "Ubuntu 22.04.5",
//     "date": {
//         "from": "2024-01-19T15:00:00.000Z",
//         "to": "2025-02-08T15:00:00.000Z"
//     }
// }

function checkAdmin($conn, $email)
{
    $stmt = $conn->prepare("SELECT Admin FROM User_infomaiton WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        return $row['Admin'] === 1; // Admin 값이 1이면 true
    }

    return false;
}

$input = json_decode(file_get_contents('php://input'), TRUE);

if ($request_method == 'GET') {
    $username = $_GET['username'] ?? null;
    $type = $_GET['type'] ?? null;
    $email = $_GET['email'] ?? null;
    switch ($type) {
        case 'user':
            if ($username) {
                $stmt = $conn->prepare("SELECT * FROM Server_application WHERE Username = ?");
                $stmt->bind_param("s", $username);

                $stmt->execute();
                $result = $stmt->get_result();

                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($data);
            } else {
                http_response_code(400);
                echo json_encode(['error' => '유저 이름을 제공해야 합니다.']);
            }
            break;

        case 'admin':
            // 어드민 권한 확인
            if (checkAdmin($conn, $email)) {
                $result = $conn->query("SELECT * FROM Server_application");
                $data = $result->fetch_all(MYSQLI_ASSOC);

                echo json_encode($data);
            } else {
                http_response_code(403);
                echo json_encode(['error' => '권한이 없습니다.']);
            }
            break;

        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            break;
    }

}
else if ($request_method == 'POST') {
    $writename = $_GET['writename'];
    $email = $_GET['email'];
    $type = $_GET['type'];

    switch ($type) {
        //유저일 경우
        case 'user':
            $created_at = date('Y-m-d H:i:s'); // 현재 날짜/시간을 변수에 저장
            $Appecet = 0;
            $rand = rand(0, 16584653);

            $stmt = $conn->prepare("INSERT INTO Server_application (id, Username, content, User_email, created_at, Appcet) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $rand, $writename, json_encode($input), $email, $created_at, $Appecet);

            if ($stmt->execute()) {
                http_response_code(201);
                echo "데이터가 성공적으로 삽입되었습니다.";
            } else {
                http_response_code(400);
                echo "데이터 삽입 실패: " . $stmt->error;
            }
            break;
        //관리자 일경우 
        case 'admin':
            //이메일로 확인
            if (checkAdmin($conn, $email)) {
                //신청된 ID
                $id = $_GET['id'] ?? null;
                $Appcet = $_GET['Appcet'] ?? null;

                $updated_at = date('Y-m-d H:i:s');
                $stmt = $conn->prepare("UPDATE Server_application SET Appcet = ?, updated_at = ? WHERE id = ?");
                $stmt->bind_param("isi", $Appcet, $updated_at, $id);

                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(['message' => '데이터가 성공적으로 업데이트되었습니다.']);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => '데이터 업데이트 실패: ' . $stmt->error]);
                }
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
    }
}
else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

?>