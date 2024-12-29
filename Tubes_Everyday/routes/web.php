<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProdukController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/', [AuthController::class, 'showLoginForm'])->name('login');
Route::get('/signup', [AuthController::class, 'showSignupForm'])->name('signup');
Route::get('/dashboard', [AuthController::class, 'showHalamanUtama'])->name('dashboard');
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

Route::get('/getProduk', [ProdukController::class, 'getProduk']);
Route::get('/getProduk/{kategori}', [ProdukController::class, 'getProdukbyCategory']);
Route::get('/getCategory', [ProdukController::class, 'getCategory']);
Route::get('/dashboard', [ProdukController::class, 'showDashboard'])->name('dashboard');