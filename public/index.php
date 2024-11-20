<?php

$request_uri = $_SERVER['REQUEST_URI'];

if (strpos($request_uri, '/api') === 0) {
    // API 요청 처리
    require __DIR__ . '/../api/index.php';
} elseif (strpos($request_uri, '/site') !== false) {
    // /site가 포함된 모든 요청에 대해 React 앱 제공
    readfile(__DIR__ . '/../site/index.html');
} else {
    // 그 외의 모든 요청에 대해 React 앱 제공
    readfile(__DIR__ . '/../site/index.html');
}