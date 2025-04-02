<?php

//#####################################
//#    이 파일은 서버신청에 관련됨 파일임    
//#####################################

error_reporting(E_ALL);
ini_set('display_errors', '1');

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

//데이터를 받아오는 코드
$request_method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), TRUE);

//메일전송하기 위한 다른 폴더 ENV로드 및 함수 설정
function send_to_mail($sned_to, $sned_subject, $sned_body)
{
    //ENV 로드
    $mailenv = Dotenv\Dotenv::createImmutable(__DIR__ . "/../part/");
    $mailenv->load();
    //메일 코드 로드 
    require(__DIR__ . '/../part/mailsender.php');
    sendGmail($sned_to, $sned_subject, $sned_body);
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
                //여기에 메일함수 적용 (신청 확인)
                $servername = $input["Servername"];
                $date = date("Y-m-d", time());
                $message = "<!DOCTYPE html>
                        <html>
                            <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
                                <div style=\"background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;\">
                                    <h2 style=\"color: #2c3e50;\">안녕하세요,</h2>
                                    
                                    <p>귀하의 서버 신청이 성공적으로 접수되었음을 알려드립니다.</p>
                                    
                                    <h3 style=\"color: #3498db;\">신청 세부사항</h3>
                                    <ul style=\"list-style-type: none; padding-left: 0;\">
                                        <li><strong>프로젝트명:</strong> {$servername}</li>
                                        <li><strong>신청일:</strong> {$date}</li>
                                    </ul>
                                    
                                    <h3 style=\"color: #3498db;\">다음 단계</h3>
                                    <ol>
                                        <li>관리자가 귀하의 신청 내용을 검토할 예정입니다.</li>
                                        <li>검토 결과는 영업일 기준 3일 이내에 이메일로 안내드릴 예정입니다.</li>
                                        <li>추가 정보가 필요한 경우 별도로 연락드리겠습니다.</li>
                                    </ol>
                                    
                                    <p>신청 내용에 대해 문의사항이나 변경사항이 있으시면 신청 번호를 참조하여 연락 주시기 바랍니다.</p>
                                    
                                    <p style=\"margin-top: 20px;\">감사합니다.</p>
                                </div>
                            </body>
                        </html>";
                send_to_mail($email, $input["Servername"] . '서버 신청 접수 확인', $message);
                http_response_code(201);
                echo "데이터가 성공적으로 삽입되었습니다.";

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
                    if ($Appcet == 3812) {
                        $servername = $input["Servername"];
                        $date = date("Y-m-d", time());
                        $message = "<!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset=\"UTF-8\">
                                            <title>서버 제작 승인 안내</title>
                                        </head>
                                        <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
                                            <div style=\"background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;\">
                                                <h2 style=\"color: #2c3e50;\">안녕하세요,</h2>
                                                
                                                <p>귀하께서 요청하신 서버 제작 건에 대해 승인이 완료되었음을 알려드리게 되어 기쁩니다.</p>
                                                
                                                <h3 style=\"color: #3498db;\">승인 세부사항</h3>
                                                <ul style=\"list-style-type: none; padding-left: 0;\">
                                                    <li><strong>프로젝트명:</strong> {$servername}</li>
                                                    <li><strong>승인일:</strong> {$date}</li>
                                                </ul>
                                                
                                                <h3 style=\"color: #3498db;\">다음 단계</h3>
                                                <ol>
                                                    <li>관리자가가 서버를 생성해서 결과 이메일을 보내드릴 예정입니다.</li>
                                                    <li>필요한 추가 정보나 자원이 있다면 알려주시기 바랍니다.</li>
                                                </ol>
                                                
                                                <p>궁금한 점이나 추가 요청사항이 있으시면 아래 연락처로 언제든지 문의해 주시기 바랍니다. 빠른 처리가 필요하신 경우, 아래 관리자 이메일로 요청해 주시면 신속히 대응해 드리겠습니다.</p>
                                                
                                                <p style=\"margin-top: 20px;\">감사합니다.</p>

                                                <h3 style=\"color: #3498db;\">연락처</h3>
                                                <p>관리자: 이호준 이메일: lyw514549@gmail.com</p>
                                                
                                            </div>
                                        </body>
                                    </html>";
                        send_to_mail($input["email"], $input["Servername"] . '서버 제작 승인 안내', $message);
                    } else if ($Appcet == 381) {
                        $servername = $input["Servername"];
                        $region = $input["region"];
                        $vmId = $input["vmId"];
                        $NetworkInfo = $input["NetworkInfo"];
                        $servertype = $input["servertype"];
                        $date = date("Y-m-d", time());
                        $message = "<!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset=\"UTF-8\">
                                            <title>서버 제작 승인 안내</title>
                                        </head>
                                        <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
                                            <div style=\"background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;\">
                                                <h2 style=\"color: #2c3e50;\">안녕하세요,</h2>
                                                
                                                <p>귀하께서 요청하신 서버 제작을 성공적으로 완료하였음을 알려드립니다.</p>
                                                
                                                <h3 style=\"color: #3498db;\">승인 세부사항</h3>
                                                <ul style=\"list-style-type: none; padding-left: 0;\">
                                                    <li><strong>프로젝트명:</strong> {$servername}</li>
                                                    <li><strong>완성 일자:</strong> {$date}</li>
                                                </ul>
                                                
                                                <h3 style=\"color: #3498db;\">서버 배치 정보</h3>
                                                <ul style=\"list-style-type: none; padding-left: 0;\">
                                                    <li><strong>배치 서버:</strong> {$region}</li>
                                                    <li><strong>VM ID:</strong> {$vmId}, Type: {$servertype}</li>
                                                </ul>
                                                <h5 style=\"color: #3498db;\">네트워크 안내사항</h5>
                                                <p>{$NetworkInfo}</p>
                                                
                                                <h3 style=\"color: #3498db;\">서버 접속시 해야하는거</h3>
                                                <ol>
                                                    <li>서버 접속 및 초기 설정 확인</li>
                                                    <li>보안 설정 점검</li>
                                                    <li>필요 시 추가 기술 지원</li>
                                                </ol>
                                                <p>궁금한 점이나 추가 요청사항이 있으시면 아래에 연락처로 언제든 연락 주시기 바랍니다.</p>
                                                
                                                <p style=\"margin-top: 20px;\">감사합니다.</p>

                                                <h3 style=\"color: #3498db;\">연락처</h3>
                                                <p>관리자: 이호준 이메일: lyw514549@gmail.com</p>
                                                
                                            </div>
                                        </body>
                                    </html>";
                        send_to_mail($input["email"], $input["Servername"] . ' 서버 제작 완료 안내', $message);
                    } else if ($Appcet == 7422) {
                        $servername = $input["Servername"];
                        $region = $input["region"];
                        $vmId = $input["vmId"];
                        $NetworkInfo = $input["NetworkInfo"];
                        $servertype = $input["servertype"];
                        $date = date("Y-m-d", time());
                        $message = "<!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset=\"UTF-8\">
                                            <title>서버 제작 승인 안내</title>
                                        </head>
                                        <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
                                            <div style=\"background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;\">
                                                <h2 style=\"color: #2c3e50;\">안녕하세요,</h2>
                                                
                                                <p>요청드린서버는 다른 서버에서 제작중입니다..</p>
                                                
                                        
                                                <p>추후 관리자가 서버 연결에 대한 정보를 이메일, 메세지로 수신할 예정입니다.</p>
                                                
                                                <p style=\"margin-top: 20px;\">감사합니다.</p>

                                                <h3 style=\"color: #3498db;\">연락처</h3>
                                                <p>관리자: 이호준 이메일: lyw514549@gmail.com</p>
                                                
                                            </div>
                                        </body>
                                    </html>";
                        send_to_mail($input["email"], $input["Servername"] . '외부 서버 제작에 대한 안내', $message);
                    } else {
                        $servername = $input["Servername"];
                        $date = date("Y-m-d", time());
                        $reason = $input["rejectionReason "];
                        $message = "<!DOCTYPE html>
                                        <html>
                                        <head>
                                            <meta charset=\"UTF-8\">
                                            <title>서버 제작 승인 안내</title>
                                        </head>
                                        <body style=\"font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;\">
                                            <div style=\"background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px; padding: 20px;\">
                                                <h2 style=\"color: #2c3e50;\">안녕하세요,</h2>
                                                
                                                <p>귀하께서 요청하신 서버 제작 건에 대해 검토한 결과, 아쉽게도 현재 승인이 어렵다는 점을 알려드립니다.</p>
                                                
                                                <h3 style=\"color: #e74c3c;\">거절 세부사항</h3>
                                                <ul style=\"list-style-type: none; padding-left: 0;\">
                                                    <li><strong>프로젝트명:</strong> {$servername}</li>
                                                    <li><strong>검토일:</strong> {$date}</li>
                                                    <li><strong>거절 사유:</strong> {$reason}</li>
                                                </ul>
                                                
                                                <p>거절 사유에 대해 추가적인 설명이 필요하시거나 문의사항이 있으시면 언제든 연락 주시기 바랍니다.</p>
                                                
                                                <h3 style=\"color: #3498db;\">향후 방향</h3>
                                                <ol>
                                                    <li>요청 내용을 수정하여 재신청하실 수 있습니다.</li>
                                                    <li>추가 정보나 보완이 필요한 경우, 관련 자료를 준비하여 문의해 주시기 바랍니다.</li>
                                                </ol>
                                                
                                                <p>귀하의 요청에 부응하지 못해 죄송합니다. 향후 더 나은 서비스를 제공할 수 있도록 노력하겠습니다.</p>
                                                
                                                <p style=\"margin-top: 20px;\">감사합니다.</p>
                                            </div>
                                        </body>
                                    </html>";
                        send_to_mail($input["email"], $input["Servername"] . '서버 제작 거절 안내', $message);
                    }
                    http_response_code(200);
                    echo json_encode(['message' => $input['name']]);
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