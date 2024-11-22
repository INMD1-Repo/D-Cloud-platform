<?php

require(__DIR__ . '/../../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// 공개되는 프로젝트 이므로 키값 무단 공개 금지
$servername = $_ENV['DB_HOST'];
$name = $_ENV['DB_USERNAME'];
$password = $_ENV['DB_PASSWORD'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];


// header 설정
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$conn = new mysqli($servername, $name, $password, $dbname, $port);

?>