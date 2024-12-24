<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    // Menampilkan form login
    public function showLoginForm()
    {
        return view('auth.login');
    }

    // Menampilkan form signup
    public function showSignupForm()
    {
        return view('auth.signup');
    }

    //Menampilkan form Halaman Utama
    public function showHalamanUtama() 
    {
        return view('welcome');
    }
    // Proses login
    public function login(Request $request)
    {
        // Validasi input
        $validated = $request->validate([
            'username' => 'required_without:email|string|max:255',
            'password' => 'required',
        ]);

        // Mengirim data login ke API Node.js
        $response = Http::post('http://localhost:3000/api/users/login', [
            'username' => $request->username,
            'password' => $request->password,
        ]);

        if ($response->successful()) {
            // Jika login berhasil, redirect ke halaman dashboard
            return redirect()->route('dashboard'); // Ganti dengan route yang sesuai
        }

        // Jika login gagal, kembali dengan error
        return back()->withErrors(['message' => 'Email atau password salah.']);
    }

    // Proses signup
    public function signup(Request $request)
{
    // Validasi input
    $validated = $request->validate([
        'username' => 'required|string|max:255|unique:users', // Menambahkan validasi untuk username
        'email' => 'required|email',
        'password' => 'required|min:8', // Password confirmation sudah otomatis ada dari form
    ]);

    // Mengirim data signup ke API Node.js
    $response = Http::post('http://localhost:3000/signup', [
        'username' => $request->username, // Pastikan username disertakan
        'email' => $request->email,
        'password' => $request->password,
    ]);

    if ($response->successful()) {
        // Jika signup berhasil, redirect ke login
        return redirect()->route('login')->with('status', 'Signup berhasil! Silakan login.');
    }

    // Jika signup gagal, kembali dengan error
    return back()->withErrors(['message' => 'Signup gagal. Silakan coba lagi.']);
}

}