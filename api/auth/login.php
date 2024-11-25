<?php

//모듈 불려오기기
require(__DIR__ . '/../../vendor/autoload.php');

//모듈로드 하기
use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;

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

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 공개되는 프로젝트 이므로 키값 무단 공개 금지
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];
$JWTkey = $_ENV['JWT_KEY'];

//JWT를 해서 사전 설정
$accessConfig = Configuration::forSymmetricSigner(
    new Sha256(),
    InMemory::base64Encoded(base64_encode($_ENV['JWT_KEY']))
);

$refreshConfig = Configuration::forSymmetricSigner(
    new Sha256(),
    InMemory::base64Encoded(base64_encode($_ENV['JWT_KEY_Refresh']))
);

$now = new DateTimeImmutable();

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

// header 설정
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = new mysqli($servername, $name, $password, $dbname, $port);

try {
    // 요청 메소드 가져오기
    $request_method = $_SERVER['REQUEST_METHOD'];
    if ($request_method == "POST") {
        $inputJSON = file_get_contents('php://input');
        $input = json_decode($inputJSON, TRUE);

        $email = $input['email'];
        $password = $input['password'];

        $stmt = $conn->prepare("SELECT * FROM User_infomaiton WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $DB_result = $stmt->get_result()->fetch_array();
        
        //비빌번호가 대칭하는지
        if (password_verify($password, $DB_result["password"])) {
            //보안 향상을 위해 JWT로 입장권 생성하기
            //-------------------------------------------------------------------
            function insertRandomLetters($numbers)
            {
                return preg_replace_callback('/\d/', function ($match) {
                    return $match[0] . chr(rand(65, 90));
                }, $numbers);
            }
            //사전 ACCESS TOken 발급
            $accessToken = $accessConfig->builder()
                ->withHeader('alg', 'HS256')
                ->withHeader('typ', 'JWT')
                ->withHeader('CreateID', insertRandomLetters($DB_result["student_id"]))
                ->identifiedBy($myuuid)
                ->issuedAt($now)
                ->canOnlyBeUsedAfter($now)
                //더 업격하게 할경우 20분이내로 해도된다 (단 서버 처리양 증가)
                ->expiresAt($now->modify('+60 minutes'))
                ->getToken(
                    $accessConfig->signer(),
                    $accessConfig->signingKey(),
                );

            //클라이언트에게 전송
            http_response_code(200);
            echo json_encode(["Code" => "20005", 'Access' => $accessToken->toString()]);

            // Refresh 토큰 생성
            $refreshToken = $refreshConfig->builder()
                ->withHeader('alg', 'HS256')
                ->withHeader('typ', 'JWT')
                ->withHeader('CreateID', insertRandomLetters($DB_result["student_id"]))
                ->identifiedBy($myuuid)
                ->issuedAt($now)
                ->canOnlyBeUsedAfter($now)
                ->expiresAt($now->modify('+7 days')) //적합한 시간
                ->getToken($refreshConfig->signer(), $refreshConfig->signingKey());

            //Back에서 Refresh,ACCESS 둘다 DB에 저장하기
            $Acess = $accessToken->toString();
            $Refresh = $refreshToken->toString();
            $sql = "insert into auth_session (jwt_resfresh, jwt_access)";
            $sql = $sql . "values('$Refresh','$Acess')";
            $result = $conn->query($sql);
            
            //-------------------------------------------------------------------
        } else {
            http_response_code(502);
            echo json_encode(["Code" => "51102", 'Error' => "NOT SAME"]);
        }
    } else {
        http_response_code(501);
    }
} catch (\Throwable $th) {
    print($th);
    http_response_code(500);
}
?>