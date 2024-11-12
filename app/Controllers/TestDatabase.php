<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class TestDatabase extends Controller
{
    public function index()
    {
        $db = \Config\Database::connect("default");
        
        try {
            $db->connect();
            echo "데이터베이스 연결 성공!";
        } catch (\Exception $e) {
            echo "데이터베이스 연결 실패: " . $e->getMessage();
        }
    }
}