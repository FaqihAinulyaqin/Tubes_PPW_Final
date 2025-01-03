<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;

class ProdukController extends Controller {
    public function addProduk(Request $request)
    {
        $token = $request->header('Authorization');

        if (!$token) {
            return response()->json(['message' => 'Token tidak ditemukan'], 403);
        }

        try {
            $user = JWTAuth::parseToken()->authenticate();
            $idPenjual = $user->id;

            $data = $request->only([
                'img_path', 'nama_produk', 'harga_produk', 'stok', 'kategori', 'sub_kategori', 'deskripsi'
            ]);

            foreach ($data as $key => $value) {
                if (empty($value)) {
                    return response()->json(['message' => "Field {$key} wajib diisi"], 400);
                }
            }

            $data['idPenjual'] = $idPenjual;
            $produk = Produk::create($data);

            return response()->json(['message' => 'Produk berhasil ditambahkan', 'produk' => $produk], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Gagal menambahkan produk', 'error' => $e->getMessage()], 500);
        }
    }

    public function getProduk(Request $request)
    {
        $response = Http::get('http://localhost:3000/api/produk/getProduk');

        if ($response->ok()) {
            return $response->json();
        }

        return response()->json(['message' => 'Failed to fetch products'], 500);
    }

    public function getProdukExDesc(Request $request)
    {
        $response = Http::get('http://localhost:3000/api/produk/getProdukExDesc');

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

    public function showHalamanProduk(Request $request)
    {
        $productId = $request->query('id');

        if (!$productId) {
            return redirect()->route('dashboard')->withErrors('ID produk tidak ditemukan.');
        }

        $apiUrl = "http://localhost:3000/api/produk/getProduk/{$productId}";
        $response = Http::get($apiUrl);

        if ($response->failed()) {
            return redirect()->route('dashboard')->withErrors('Gagal memuat detail produk.');
        }

        $product = $response->json()['data'][0] ?? null;

        if (!$product) {
            return redirect()->route('dashboard')->withErrors('Produk tidak ditemukan.');
        }
        
        return view('halamanProduk', compact('product'));
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
