<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->get('test-db', 'TestDatabase::index');
$routes->post('register', 'AuthController::register');
$routes->post('login', 'AuthController::login');

$routes->group('users', ['filter' => 'auth'], function($routes) {
    $routes->get('', 'UserController::index');
    $routes->get('(:num)', 'UserController::show/$1');
    $routes->put('(:num)', 'UserController::update/$1');
    $routes->delete('(:num)', 'UserController::delete/$1');
});