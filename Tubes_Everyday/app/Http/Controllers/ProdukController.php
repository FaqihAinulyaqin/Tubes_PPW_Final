<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
}