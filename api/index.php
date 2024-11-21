<?php

header('Content-Type: application/json');

// CORS 설정 (필요한 경우)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// 요청 메소드와 경로 가져오기
$request_method = $_SERVER['REQUEST_METHOD'];
$request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path_parts = explode('/', trim($request_path, '/'));

// 'api' 부분 제거
array_shift($path_parts);

// API 엔드포인트에 따른 처리
switch ($path_parts[0]) {
    case 'apitest':
        if ($request_method == 'GET') {
            echo json_encode(array("test" => "successfull"));
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;
    
    case 'hello':
        echo json_encode(['message' => 'Hello, World!']);
        break;

    case 'createPost':  //글 작성시 호출
        if ($request_method == 'POST') {
            createPost();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    case 'readPost':    //글 조회시 호출
        if ($request_method == 'POST') {
            readPost();
        } else {
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
        }
        break;

    
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not Found']);
        break;
}