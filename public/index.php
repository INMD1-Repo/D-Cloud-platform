<?php

$request_uri = $_SERVER['REQUEST_URI'];

if (strpos($request_uri, '/api') === 0) {
    // API 요청 처리
    require __DIR__ . '/../api/index.php';
} elseif (strpos($request_uri, '/site') === 0) {
    // site 파일 직접 제공
    return false;
} else {
    // React 앱 제공
    readfile(__DIR__ . '/../site/index.html');
}