<?php

// 요청 메소드와 경로 가져오기
$request_method = $_SERVER['REQUEST_METHOD'];
$request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($request_path, '/'));

// 'api' 부분 제거
array_shift($path_parts);

// API 엔드포인트에 따른 처리
switch ($path_parts[0]) {
    //API TEST
    case 'apitest':
        if ($request_method == 'GET') {
            echo json_encode(array("message" => "successfull"));
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
    case 'proxmox':
        require __DIR__ . "/proxmox/index.php";
        break;
    //회원가입&로그인
    case "login":
        require __DIR__ . '/auth/login.php';
        break;
    case "singup":
        require __DIR__ . '/auth/signup.php';
        break;
    case "logout":
        require __DIR__ . '/auth/logout.php';
        break;
    case 'department':
        require __DIR__ . '/auth/department.php';
        break;
    //게시판D
    case 'createPost':
        require __DIR__ . '/board/createPost.php';
        break;
    case 'readPost':
        require __DIR__ . '/board/readPost.php';
        break;
    //서버 관련
    case 'server_application':
        require __DIR__ . '/Server/index.php';
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}
?>