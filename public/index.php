<?php

$request_uri = $_SERVER['REQUEST_URI'];

if (strpos($request_uri, '/api') === 0) {
    // API 요청 처리
    require __DIR__ . '/../api/index.php';
} else {
    // /site로 시작하지 않는 모든 요청을 /site로 리다이렉트
    if (strpos($request_uri, '/site') !== 0) {
        header('Location: /site' . $request_uri);
        exit;
    }
    // React 앱 제공
    readfile(__DIR__ . '/../site/index.html');
}
