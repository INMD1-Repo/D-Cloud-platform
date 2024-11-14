<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class SingupController extends ResourceController
{
    //회원가입할때 데이터베이스에 어떻게 저장해야 할지 코드를 작성한다.
    public function register()
    {
        //암호화 키 불려오기
        $Password_Hash = getenv('Password_Hash');

        //규칙정하기 -> require가 없는 경우 에려를 반환한다.
        $rules = [
            'email' => 'required|valid_email|is_unique[users.email]',
            'name' => 'required',
            'phone_number' => 'required',
            'student_id' => 'required|is_unique[users.student_id]',
            'username' => 'required|is_unique[users.username]',
            'password' => password_hash($this->request->getVar($Password_Hash), PASSWORD_DEFAULT), // 비밀번호 해시화
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        //사전에 정의한 모델 불려오기
        $model = new UserModel();

        //REST API에서 가져온 데이터를 행렬로 만들고 데이터를 넣기
        $data = [
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'phone_number' => $this->request->getVar('phone_number'),
            'student_id' => $this->request->getVar('student_id'),
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password'),
        ];

        // 데이터베이스에 데이터 삽입 후 고유 ID를 반환받음
        $model->insert($data);

        // 랜덤 ID 생성
        $tsic_id = substr(bin2hex(random_bytes(5)), 0, 10);
        $data['id'] = $tsic_id;

        // 보안을 위해 비밀번호는 제거
        unset($data['password']);

        //정상 응답을 보낸다.
        return $this->respondCreated($data);
    }
}