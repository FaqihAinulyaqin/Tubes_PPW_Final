<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
    use HasFactory;

    protected $table = 'Produk';

    protected $fillable = [
        'img_path',
        'nama_produk',
        'harga_produk',
        'stok',
        'kategori',
        'sub_kategori',
    ];
}