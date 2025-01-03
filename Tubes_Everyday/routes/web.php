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
Route::get('/getProdukExDesc', [ProdukController::class, 'getProdukExDesc']);
Route::get('/getProduk/{kategori}', [ProdukController::class, 'getProdukbyCategory']);
Route::get('/getCategory', [ProdukController::class, 'getCategory']);
Route::get('/dashboard', [ProdukController::class, 'showDashboard'])->name('dashboard');
Route::get('/halamanProduk', [ProdukController::class, 'showHalamanProduk'])->name('halamanProduk');

Route::get('/wishlist', [WishlistController::class, 'showWishlist'])->name('Wishlist');    // Get all wishlist items
Route::post('/wishlist', [WishlistController::class, 'postWishlist']);   // Add product to wishlist
Route::delete('/wishlist/{id}', [WishlistController::class, 'deleteWishlist']); // Delete a wishlist item

Route::get('/search', [ProdukController::class, 'search'])->name('search.produk');
Route::post('/signup', [AuthController::class, 'signup']);