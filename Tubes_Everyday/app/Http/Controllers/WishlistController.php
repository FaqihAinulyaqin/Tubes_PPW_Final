<?php

namespace App\Http\Controllers;
use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    //
    public function index()
    {
        $userId = auth()->id();
        $wishlists = Wishlist::with('product') 
            ->where('user_id', $userId)
            ->get();

        return response()->json($wishlists);
    }

    // Menambahkan produk ke wishlist
    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:Produk,id',
        ]);

        Wishlist::create([
            'user_id' => auth()->id(),
            'product_id' => $request->product_id,
        ]);

        return response()->json(['message' => 'Produk berhasil ditambahkan ke wishlist']);
    }

    // Menghapus produk dari wishlist
    public function destroy($id)
    {
        $wishlist = Wishlist::where('id', $id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$wishlist) {
            return response()->json(['message' => 'Wishlist tidak ditemukan'], 404);
        }

        $wishlist->delete();

        return response()->json(['message' => 'Produk berhasil dihapus dari wishlist']);
    }

}
