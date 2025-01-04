<?php

//#####################################
//# 이 파일은 서버신청에 관련됨 파일임  #
//#####################################

error_reporting(E_ALL);
ini_set('display_errors', '0');

require(__DIR__ . '/../../vendor/autoload.php');
header('Content-Type: application/json');

//현재 폴더에 있는 ENV로드드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 연결
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $_ENV['DB_PORT']);
if ($conn->connect_error) {
    die(json_encode(['Error' => "데이터베이스 연결 실패: " . $conn->connect_error]));
}

//관리자 인지확인하는 코드드
function checkAdmin($conn, $email)
{
    // 개발모드가 아니면 원래 데이터베이스에 연결을 해야한다.
    if ($_ENV['Type'] == 'main') {
        $conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], 'Dcloud_Auth', $_ENV['DB_PORT']);
    }
    $stmt = $conn->prepare("SELECT Admin FROM User_infomaiton WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        return $row['Admin'] === 1; // Admin 값이 1이면 true
    }

    return false;
}

//데이터를 받아오는 코드드
$request_method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), TRUE);

//메일전송하기 위한 다른 폴더 ENV로드 및 함수 설정
function send_to_mail($sned_to, $sned_subject, $sned_body, $sned_attachments = [])
{
    //ENV 로드
    $mailenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../part/");
    $mailenv->load();
    //메일 코드 로드 
    require(__DIR__ . '/../part/mailsender.php');
}

//API작동 하는 코드드
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
        case 'personal':
            $id = $_GET['id'] ?? null;
            if ($id) {
                $stmt = $conn->prepare("SELECT * FROM Server_application WHERE Username = ? AND id = ?");
                $stmt->bind_param("si", $username, $id);

                $stmt->execute();
                $result = $stmt->get_result();

                $data = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($data);
            } else {
                http_response_code(400);
                echo json_encode(['error' => '신청한 ID를 적어주십시오.']);
            }
            break;
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method Not Allowed']);
            break;
    }

} else if ($request_method == 'POST') {
    $writename = $_GET['writename'];
    $email = $_GET['email'];
    $type = $_GET['type'];

    switch ($type) {
        //유저일 경우 서버를 신청하는 곳이다.
        case 'user':
            $created_at = date('Y-m-d H:i:s'); // 현재 날짜/시간을 변수에 저장
            $Appecet = 0;
            $rand = rand(0, 16584653);

            $stmt = $conn->prepare("INSERT INTO Server_application (id, Username, content, User_email, created_at, Appcet) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $rand, $writename, json_encode($input), $email, $created_at, $Appecet);

            if ($stmt->execute()) {
                http_response_code(201);
                echo "데이터가 성공적으로 삽입되었습니다.";
                //여기에 메일함수 적용 (신청 확인)
            } else {
                http_response_code(400);
                echo "데이터 삽입 실패: " . $stmt->error;
            }
            break;
        //관리자 일경우 승인 미승인이 결정을 짓는곳곳
        case 'admin':
            //이메일로 확인
            if (checkAdmin($conn, $email)) {
                //신청된 ID
                $id = $_GET['id'] ?? null;
                $Appcet = $_GET['Appcet'] ?? null;

                $updated_at = date('Y-m-d H:i:s');
                $stmt = $conn->prepare("UPDATE Server_application SET Appcet = ?, content = ?, updated_at = ? WHERE id = ?");
                $stmt->bind_param("sssi", $Appcet, json_encode($input), $updated_at, $id);

                if ($stmt->execute()) {
                    http_response_code(200);
                    echo json_encode(['message' => $input['name']]);
                    //여기에 메일함수 적용 (결과 확인)
                    

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
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

?>