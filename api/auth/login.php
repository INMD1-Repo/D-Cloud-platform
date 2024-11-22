<?php

require(__DIR__ . '/../../vendor/autoload.php');

use Firebase\JWT\JWT;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 공개되는 프로젝트 이므로 키값 무단 공개 금지
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];
$JWTkey =  $_ENV['JWT_KEY'];

// header 설정
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = new mysqli($servername, $name, $password, $dbname, $port);


//password_verify("Test",  $input["password"])

try {
    // 요청 메소드 가져오기
    $request_method = $_SERVER['REQUEST_METHOD'];
    if ($request_method == "POST") {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $email = $input['email'];
        $password = $input['password'];
        
        $sql = "SELECT * FROM User_infomaiton  WHERE email = '$email'";
        $DB_result = $conn->query($sql);
        $DB_result  = mysqli_fetch_array( $DB_result );
        

        //비빌번호가 대칭하는지
        if(password_verify($password,  $DB_result["password"])){
            //암호화전 데이터 넣기
            $payload = array(
                "username" => "MESSI",
                "email" => "MESSI@example.com"
            );
            http_response_code(200);
        }else{
            http_response_code(502); // 503 상태 코드 반환
            echo json_encode(["Code" => "51102", 'Error' => "NOT SAME"]);
        }
    } else {
        http_response_code(501); // 500 상태 코드 반환
    }

} catch (\Throwable $th) {
    http_response_code(500); // 500 상태 코드 반환
    json_encode(["Code" => "50001", 'Error' => "Server ERROR" . $th->getMessage()]);
}

?>