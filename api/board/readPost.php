<?php
$host = 'localhost'; // DB 호스트
$db_name = 'boardDB'; // 사용할 DB 이름
$username = 'root'; // DB 사용자명
$password = ''; // DB 비밀번호 (설정한 경우 추가)
$conn = new mysqli($host, $username, $password, $db_name);

    $post_id = $_GET['id'] ?? null;

    // 유효성 검사
    if (empty($post_id) || !is_numeric($post_id)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid or missing post ID']);
        return;
    }

    // 연결 오류 처리
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
        return;
    }

    // SQL 쿼리 실행
    $query = "SELECT id, username, title, content, updatedate FROM notice WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $post_id); // `i`는 정수 타입
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $post = $result->fetch_assoc();
        http_response_code(200);
        return json_encode($post); // 게시글 데이터를 JSON 형식으로 반환
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Post not found']);
    }

    // 연결 종료
    $stmt->close();
    $conn->close();
?>