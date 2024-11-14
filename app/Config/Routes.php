<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index'); //Vue를 보여주기 위한 폴더

$routes->get('test-db', 'TestDatabase::index'); //데이터베이스가 정상 연결 확인 컨트롤러

$routes->group('auth', function($routes) { //auth 관련 처리는 그룹으로 묶었다.
    $routes->post('register', 'AuthController::register'); // 회원가입 컨트롤러
    $routes->post('login', 'AuthController::login'); // 회원가입 컨트롤러
    $routes->post('recreate', 'AuthController::recreate'); // Access 토큰이 만료시 재발급 컨트롤러
});
