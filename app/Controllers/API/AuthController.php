<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class AuthController extends ResourceController
{
    public function register()
    {
        $rules = [
            'email' => 'required|valid_email|is_unique[users.email]',
            'name' => 'required',
            'phone_number' => 'required',
            'student_id' => 'required|is_unique[users.student_id]',
            'username' => 'required|is_unique[users.username]',
            'password' => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors());
        }

        $model = new UserModel();
        $data = [
            'email' => $this->request->getVar('email'),
            'name' => $this->request->getVar('name'),
            'phone_number' => $this->request->getVar('phone_number'),
            'student_id' => $this->request->getVar('student_id'),
            'username' => $this->request->getVar('username'),
            'password' => $this->request->getVar('password'),
        ];

        $user_id = $model->insert($data);
        $data['id'] = $user_id;
        unset($data['password']);

        return $this->respondCreated($data);
    }

    public function login()
    {
        $model = new UserModel();

        $username = $this->request->getVar('username');
        $password = $this->request->getVar('password');

        $user = $model->where('username', $username)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid credentials');
        }

        $key = getenv('JWT_SECRET');
        $payload = [
            'iat' => time(),
            'exp' => time() + 3600,
            'uid' => $user['id'],
            'email' => $user['email'],
        ];

        $token = JWT::encode($payload, $key, 'HS256');

        return $this->respond(['token' => $token]);
    }
}