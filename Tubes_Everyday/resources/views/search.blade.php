<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>

    <title>Halaman Search</title>
</head>
<body>
<div class="container header">
    <div>
        <img alt="Logo" height="40" src="{{ asset('images/auth/Group 39.png') }}" width="auto" />
    </div>
    <div class="search-form">
        <form action="{{ route('search.produk') }}" method="GET" id="searchForm">
            <input type="text" name="searchTerm" placeholder="Cari produk..." id="searchInput" required>
            <button type="submit" class="search-button">
                <i class="fas fa-search search-icon"></i>
            </button>
        </form>
    </div>   
    <div class="nav">
        <a href="#"><i class="fas fa-heart"></i></a>
        <a href="#"><i class="fas fa-user"></i> Username </a>
        <a class="sell" href="#">Sell</a>
    </div>
</div>

<div class="recommendation">
    <h3>{{ $message }}</h3>
    <table id="data-table">
    @if (empty($products))
    <tr><td colspan="4">Tidak ada produk yang ditemukan.</td></tr>
@else
    @foreach (array_chunk($products, 4) as $productChunk)
        <tr>
            @foreach ($productChunk as $product)
                <td>
                    <div class="product-item">
                        <i class="far fa-heart favorite" onclick="toggleFavorite(this)"></i>
                        <div class="product-image">
                            <img alt="Product Image" height="200" src="{{ $product['img_path'] ?? 'https://via.placeholder.com/150' }}" width="auto" />
                        </div>
                        <div class="info">
                            <div class="name">{{ $product['nama_produk'] ?? 'Unknown Product' }}</div>
                            <div class="price">Rp {{ number_format($product['harga_produk'] ?? 0, 0, ',', '.') }}</div>
                            <div class="description">{{ $product['kategori'] ?? 'Unknown Category' }}</div>
                        </div>
                        <div class="detail-button">
                            <a href="{{ route('halamanProduk') }}?id={{ $product['id'] }}">Lihat Detail</a>
                        </div>
                    </div>
                </td>
            @endforeach
        </tr>
    @endforeach
@endif
    </table>
</div>

<script>
    function toggleFavorite(icon) {
        icon.classList.toggle('fas');
        icon.classList.toggle('far');
    }
</script>
</body>
</html>