<?php
// 모듈 불러오기
require(__DIR__ . '/../../vendor/autoload.php');

// 네임스페이스 설정
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Validation\Constraint;
use Lcobucci\JWT\Signer\Hmac\Sha256; // 누락된 네임스페이스 추가
use Lcobucci\JWT\Signer\Key\InMemory;

// 환경 변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 및 JWT 설정
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];
$JWTkey = $_ENV['JWT_KEY'];

$conn = new mysqli($servername, $name, $password, $dbname, $port);

// JWT 설정
$accessConfig = Configuration::forSymmetricSigner(
    new Sha256(),
    InMemory::plainText($JWTkey)
);

try {
    // 요청 메소드 가져오기
    $request_method = $_SERVER['REQUEST_METHOD'];

    if ($request_method === "POST") {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        if (!isset($_GET["type"])) {
            http_response_code(400);
            echo json_encode(["Code" => "40002", "Error" => "type 매개변수가 필요합니다"]);
            exit;
        }

        switch ($_GET["type"]) {
            case 'infoUser':
                $token = $accessConfig->parser()->parse($input["token"]);
                assert($token instanceof \Lcobucci\JWT\UnencryptedToken);

                // 서명 검증
                if (!$accessConfig->validator()->validate(
                    $token,
                    new Constraint\SignedWith($accessConfig->signer(), $accessConfig->verificationKey())
                )) {
                    http_response_code(401);
                    echo json_encode(["Code" => "40101", "Error" => "토큰 서명이 유효하지 않습니다."]);
                    exit;
                }

                if ($token->isExpired(new \DateTimeImmutable())) {
                    http_response_code(401);
                    echo json_encode(["Code" => "40102", "Error" => "토큰이 만료되었습니다."]);
                    exit;
                }

                //유효하면 Header 안에 ID 추출해서 소금 분리후 유저정보 조회함
                $headers = $token->headers()->all(); // 헤더 전체를 가져옴
                $ID = preg_replace('/[A-Za-z]/', '', $headers["CreateID"]);

                //데이터베이스에서 조회
                $stmt = "SELECT * FROM User_infomaiton WHERE student_id = $ID";
                $result = mysqli_query($conn, $stmt);
                $row = mysqli_fetch_assoc($result);
                print(json_encode($row));
                break;

            default:
                http_response_code(400);
                echo json_encode(["Code" => "40001", "Error" => "유효하지 않은 요청 타입"]);
                break;
        }
    } else {
        http_response_code(405);
        echo json_encode(["Code" => "40500", "Error" => "허용되지 않은 메소드"]);
    }
} catch (\Throwable $th) {
    http_response_code(500);
    echo json_encode(["Code" => "50001", 'Error' => "서버 에러"]);
}
?>
