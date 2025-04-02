<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

//환경변수 로드
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

function sendGmail($to, $subject, $body, $attachments = []) {
    require(__DIR__ . '/../../vendor/autoload.php');

    $mail = new PHPMailer(true);

    try {
        // 서버 설정
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->isHTML(true);
        $mail->Username = $_ENV['EAMIL']; // 구글 이메일 주소
        $mail->Password = $_ENV['APP_PASSWORD']; // 구글 앱 비밀번호
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;

        // 발신자 설정
        $mail->setFrom($_ENV['EAMIL'], 'Dcloud Admin');
        
        // 수신자 설정
        $mail->addAddress($to);

        // 첨부 파일 추가
        foreach ($attachments as $attachment) {
            $mail->addAttachment($attachment);
        }

        // 내용 설정
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->send();
        return true;
    } catch (Exception $e) {
        return "메일 전송 실패: {$mail->ErrorInfo}";
    }
}
?>