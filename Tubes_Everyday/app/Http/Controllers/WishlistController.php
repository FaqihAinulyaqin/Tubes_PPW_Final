<?php

namespace App\Http\Controllers;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WishlistController extends Controller
{
    //
    public function showWishlist()
    {
        $response = Http::get('http://localhost:3000/api/wishlist', [
            'user_id' => auth()->id(),
        ]);

        if ($response->ok()) {
            return response()->json($response->json());
        }

        return response()->json(['message' => 'Failed to fetch wishlist', 'error' => $response->body()], 500);
    }

    public function postWishlist(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:Produk,id',
        ]);

        $response = Http::post('http://localhost:3000/api/wishlist', [
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        if ($response->ok()) {
            return response()->json($response->json());
        }

        return response()->json(['message' => 'Failed to add product to wishlist', 'error' => $response->body()], 500);
    }

    public function deleteWishlist($id)
    {
        $response = Http::delete("http://localhost:3000/api/wishlist/{$id}", [
            'user_id' => auth()->id(),
        ]);

        if ($response->ok()) {
            return response()->json($response->json());
        }

        return response()->json(['message' => 'Failed to delete wishlist item', 'error' => $response->body()], 500);
    }


}
