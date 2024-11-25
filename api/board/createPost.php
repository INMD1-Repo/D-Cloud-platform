<?php
$host = 'localhost'; // DB 호스트
$db_name = 'boardDB'; // 사용할 DB 이름
$username = 'root'; // DB 사용자명
$password = ''; // DB 비밀번호 (설정한 경우 추가)

$conn = new mysqli($host, $username, $password, $db_name);
    // 입력 데이터 가져오기
$input = json_decode(file_get_contents('php://input'), true);

    // 유효성 검사
    if (empty($input['username']) || empty($input['title']) || empty($input['content'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input data']);
        return;
    }

    // 변수 매핑
    $username = $input['username'];
    $title = $input['title'];
    $content = $input['content'];
    $updatedate = date('Y-m-d H:i:s'); // 현재 시간으로 설정


    // 연결 오류 처리
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
        return;
    }

    // SQL 쿼리 실행
    $query = "INSERT INTO notice (username, title, content, updatedate) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssss", $username, $title, $content, $updatedate);

    if ($stmt->execute()) {
        http_response_code(201);
        echo json_encode(['message' => 'Post created successfully']);
    } else {
        http_response_code(500);
    echo json_encode(['error' => 'Failed to create post: ' . $stmt->error]);
    }

    // 연결 종료
$stmt->close();
$conn->close();
?>