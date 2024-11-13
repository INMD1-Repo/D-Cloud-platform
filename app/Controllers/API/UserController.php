<?php

namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class UserController extends ResourceController
{
    protected $model;

    public function __construct()
    {
        $this->model = new UserModel();
    }

    public function index()
    {
        $users = $this->model->findAll();
        return $this->respond($users);
    }

    public function show($id = null)
    {
        $user = $this->model->find($id);
        if (!$user) {
            return $this->failNotFound('User not found');
        }
        return $this->respond($user);
    }

    public function update($id = null)
    {
        $user = $this->model->find($id);
        if (!$user) {
            return $this->failNotFound('User not found');
        }

        $data = $this->request->getJSON();
        if (!$this->model->update($id, $data)) {
            return $this->fail($this->model->errors());
        }

        return $this->respond($this->model->find($id));
    }

    public function delete($id = null)
    {
        $user = $this->model->find($id);
        if (!$user) {
            return $this->failNotFound('User not found');
        }

        if ($this->model->delete($id)) {
            return $this->respondDeleted(['id' => $id]);
        }

        return $this->fail('Failed to delete the user');
    }
}