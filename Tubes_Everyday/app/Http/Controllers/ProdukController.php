<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

class ProdukController extends Controller {

    public function getProduk(Request $request)
    {
        $response = Http::get('http://localhost:3000/api/produk/getProduk');

        if ($response->ok()) {
            return $response->json();
        }

        return response()->json(['message' => 'Failed to fetch products'], 500);
    }

    public function getProdukbyCategory(Request $request)
    {
        $respone = http::get('http://localhost:3000/api/produk/getProduk/{$kategori}');

        if ($respone->ok()) {
            return $respone->json();
        }

        return response()->json(['message' => 'Failed to fetch products'], 500);
    }

    public function getCategory(Request $request)
    {
        $response = Http::get('http://localhost:3000/api/produk/getCategory');

        if ($response->ok()) {
            return $response->json();
        }

        return response()->json(['message' => 'Failed to fetch kategori'], 500);
    }

    public function showDashboard()
    {
        return view('Dashboard');
    }

    public function search(Request $request)
    {
        $query = $request->input('searchTerm');

        if (!$query) {
            return view('search', [
                'products' => [],
                'message' => 'Kata kunci tidak boleh kosong.',
                'searchTerm' => $query,
            ]);
        }

        try {
            // Panggil API Node.js
            $response = Http::get('http://localhost:3000/api/search/searchProduk', [
                'searchTerm' => $query,
            ]);

            if ($response->successful()) {
                Log::info('API Response:', $response->json());
                $data = $response->json();
                $products = $data['data'] ?? [];
                $message = 'Hasil pencarian untuk "' . $query . '"';
            } else {
                Log::warning('API Error: ' . $response->body());
                $products = [];
                $message = $response->json()['message'] ?? 'Gagal mengambil data dari API.';
            }
        } catch (\Exception $e) {
            Log::error('Exception: ' . $e->getMessage());
            $products = [];
            $message = 'Terjadi kesalahan saat menghubungi API: ' . $e->getMessage();
        }

        return view('search', [
            'products' => $products,
            'message' => $message,
            'searchTerm' => $query,
        ]);
    }
}