<?php
//현재 폴더에 있는 ENV로드드
require(__DIR__ . '/../../vendor/autoload.php');
function send_to_mail($sned_to, $sned_subject, $sned_body)
{
    // ENV 로드
    $mailenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../part/");
    $mailenv->load();
    // 메일 코드 로드
    require(__DIR__ . '/../part/mailsender.php');
    sendGmail($sned_to, $sned_subject, $sned_body);
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 데이터베이스 연결
$conn = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USERNAME'], $_ENV['DB_PASSWORD'], $_ENV['DB_NAME'], $_ENV['DB_PORT']);
if ($conn->connect_error) {
    die(json_encode(['Error' => "데이터베이스 연결 실패: " . $conn->connect_error]));
}

// 주기적으로 이메일 발송 처리
while (true) {
    $result = $conn->query("SELECT * FROM email_queue WHERE sent = 0");
    while ($row = $result->fetch_assoc()) {
        $userEmail = $_ENV['ADMIN'];
        $content = json_decode($row['content'], true); // JSON 데이터를 배열로 변환

        // 유니코드 이스케이프 문자열 디코딩
        array_walk_recursive($content, function (&$value) {
            if (is_string($value)) {
                $value = json_decode('"' . $value . '"');
            }
        });

        // HTML 이메일 본문 구성
        $message = "<html><body>";
        $message .= "<h2>새로운 애플리케이션 등록 정보</h2>";
        $message .= "<table border='1' cellpadding='8' cellspacing='0'>";

        foreach ($content as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
            }
            $message .= "<tr><td><strong>" . htmlspecialchars($key) . "</strong></td><td>" . nl2br(htmlspecialchars($value)) . "</td></tr>";
        }

        $message .= "</table>";
        $message .= "</body></html>";

        // 이메일 발송
        $subject = "새로운 서버 신청서 등록 알림";
        send_to_mail($userEmail, $subject, $message);

        // 이메일 발송 성공 시 sent 상태 업데이트
        $conn->query("UPDATE email_queue SET sent = 1 WHERE id = " . $row['id']);
    }
    sleep(10); // 10초마다 실행
}
?>