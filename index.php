<?php 
namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        // 이부분 view() 안에 있는 부분을 바꿔주자
        return view('frontend/index.html');
    }
}