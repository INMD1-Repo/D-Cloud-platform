<?php
// 모듈 불러오기
require(__DIR__ . '/../../vendor/autoload.php');

// 네임스페이스 설정
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Validation\Constraint;
use Lcobucci\JWT\Signer\Hmac\Sha256; // 누락된 네임스페이스 추가
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\Validation\Constraint\SignedWith;
use Lcobucci\JWT\Validation\Constraint\RelatedTo;

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

// JWT 설정
$accessConfig = Configuration::forSymmetricSigner(
    new Sha256(),
    InMemory::base64Encoded(base64_encode($_ENV['JWT_KEY']))
);

$refreshConfig = Configuration::forSymmetricSigner(
    new Sha256(),
    InMemory::base64Encoded(base64_encode($_ENV['JWT_KEY_Refresh']))
);

//ID소금 치기 위한 함수(재활용)
function insertRandomLetters($numbers)
{
    return preg_replace_callback('/\d/', function ($match) {
        return $match[0] . chr(rand(65, 90));
    }, $numbers);
}

//랜덤 UUID 생성
function guidv4($data = null)
{
    $data = $data ?? random_bytes(16);
    assert(strlen($data) == 16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
$myuuid = guidv4();



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
            //토큰으로 인증해서 사용자 정보를 가지고옴
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
                $stmt = $conn->prepare("SELECT * FROM User_infomaiton WHERE student_id = ?");
                $stmt->bind_param("s", $ID); // "s"는 문자열 타입을 나타냄
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                print(json_encode($row));
                break;

            //만료된 토큰을 다시 인증해서 DB에 저장
            case 'token_fresh':
                //Access토큰으로 Refresh 토큰 조회
                $stmt = $conn->prepare("SELECT * FROM auth_session WHERE jwt_access = ?");
                $stmt->bind_param("s", $input["token"]); // "s"는 문자열 타입을 나타냄
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc(); //$row["jwt_resfresh"]

                //기존 Access토큰에서 ID추출
                $token = $accessConfig->parser()->parse($input["token"]);
                $headers = $token->headers()->all(); // 헤더 전체를 가져옴
                $ID = preg_replace('/[A-Za-z]/', '', $headers["CreateID"]);

                //다시 발급 하기 위해서 ID값의 소금을 제거후 다시 난수화 처리
                // print($row["jwt_resfresh"]);
                $refesh_token = $refreshConfig->parser()->parse($row["jwt_resfresh"]);
                $constraints = [
                    new SignedWith($refreshConfig->signer(), $refreshConfig->signingKey())
                ];
            
                if (!$refreshConfig->validator()->validate($refesh_token, ...$constraints)) {
                    print('Invalid refresh token');
                }
                $now = new DateTimeImmutable();

                //login php했던짓 다시 시작
                $accessToken = $accessConfig->builder()
                ->withHeader('alg', 'HS256')
                ->withHeader('typ', 'JWT')
                ->withHeader('CreateID', insertRandomLetters($ID))
                ->identifiedBy($myuuid)
                ->issuedAt($now)
                ->canOnlyBeUsedAfter($now)
                //더 업격하게 할경우 20분이내로 해도된다 (단 서버 처리양 증가)
                ->expiresAt($now->modify('+60 minutes'))
                ->getToken(
                    $accessConfig->signer(),
                    $accessConfig->signingKey(),
                );

                //DB에 변경된 내용저장
                $updateStmt = $conn->prepare("UPDATE auth_session SET jwt_access = ? WHERE jwt_resfresh = ?");
                $updateStmt->bind_param("ss", $accessToken->toString(), $row["jwt_resfresh"]);
                $updateResult = $updateStmt->execute();

                //사용자에게 다시 보내기
                echo json_encode([
                    "Code" => "20005",
                    'Access' => $accessToken->toString()
                ]);
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
    print($th);
    http_response_code(500);
    echo json_encode(["Code" => "50001", 'Error' => "서버 에러"]);
}
?>
