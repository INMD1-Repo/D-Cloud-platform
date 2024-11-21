<?php

require(__DIR__ . '/../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 공개되는 프로젝트 이므로 키값 무단 공개 금지
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];


// header 설정
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = new mysqli($servername, $name, $password, $dbname, $port);

//DB연결 못하면 어려발생
if ($conn->connect_error) {
    die(json_encode(['Error' => "데이터베이스 연결 실패" . $conn->connect_error]));
} else {
    // 요청 메소드 가져오기
    $request_method = $_SERVER['REQUEST_METHOD'];

    if ($request_method == 'GET') {
        //GET TEST
        echo json_encode(['message' => "I'm here"]);
    } else if ($request_method == 'POST') {
        try {
            $inputJSON = file_get_contents('php://input');
            $input = json_decode($inputJSON, TRUE);

            //기본 조회
            $email = $input['email'];
            $name = $input['name'];
            //암호화 PASSWORD_ARGON2ID을 사용 (복호화 불가능)
            $password = password_hash($input["password"], PASSWORD_ARGON2ID);
            $student_class = $input['student_class'];
            $student_ID = $input['student_ID'];
            $phone_number = $input['phone_number'];
            $created_at = date('Y-m-d H:i:s');

            //데이터베이스 업로드
            $sql = "insert into User_infomaiton (email, name, password, phone_number, student_id, student_class, created_at)";
            $sql = $sql . "values('$email','$name','$password','$phone_number','$student_ID','$student_class','$created_at')";

            ;

            // 이메일 중복 체크
            $check_email_sql = "SELECT COUNT(*) FROM User_infomaiton WHERE email = ?";
            $stmt = $conn->prepare($check_email_sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $stmt->bind_result($count);
            $stmt->fetch();
            $stmt->close();

            // 학생 ID 중복 체크
            $check_student_id_sql = "SELECT COUNT(*) FROM User_infomaiton WHERE student_id = ?";
            $stmt = $conn->prepare($check_student_id_sql);
            $stmt->bind_param("s", $student_ID);
            $stmt->execute();
            $stmt->bind_result($student_id_count);
            $stmt->fetch();
            $stmt->close();

            if ($count > 0) {
                http_response_code(503); // 503 상태 코드 반환
                echo json_encode(['Error' => "이메일이 이미 존재합니다. 관리자에게 문의 하십시오."]);
                exit; // 나머지 코드 실행 중지
            } elseif ($student_id_count > 0) {
                http_response_code(503); // 503 상태 코드 반환
                echo json_encode(['Error' => "학생 ID가 이미 존재합니다. 관리자에게 문의 하십시오."]);
                exit; // 나머지 코드 실행 중지
            } else {
                //없으면 업로드함
                $result = $conn->query($sql);
                if ($result) {
                    echo json_encode(['message' => "OK", "data" => json_encode($input)]);
                }
            }

            // 연결 종료
            $stmt->close();
            $conn->close();
        } catch (\Throwable $th) {
            json_encode(['Error' => "생성실패" . $th->getMessage()]);
        }
    }
}

?>