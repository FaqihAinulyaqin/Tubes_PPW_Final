<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="{{ asset('css/wishlist.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    <title>Wishlist</title>
</head>
<body>
<div class="container header">
        <div>
            <a href="{{ route('dashboard') }}">
                    <img alt="Logo" height="40" src="{{ asset('images/auth/Group 39.png') }}" width="auto"/>
                </a>
            <div class="dropdown">
                <a>Kategori <i class="fas fa-chevron-down"></i></a>
                <div class="dropdown-content" id="kategori-list">
                    <!-- Data Kategori akan dimuat di sini -->
                </div>
            </div>
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
            <a href="{{ route('ShowWishlistPage') }}"><i class="fas fa-heart"></i></a>
            <a href="#"><i class="fas fa-user"></i>  </a>
            <a class="sell" href="{{ route('ShowAddProduk') }}">Sell</a>
        </div>
    </div>
    <div class="container wishlist">
        <h2>Your Wishlist</h2>
        <div class="row">
            @foreach ($wishlists as $item)
                <div class="col-md-3 product-card">
                    <div class="product-item">
                        <i class="fas fa-heart remove-favorite" data-id="{{ $item['product_id'] }}"></i>
                        <img src="{{ $item['product_img_path'] }}" alt="{{ $item['product_nama_produk'] }}" class="product-image"/>
                        <div class="info">
                            <h4>{{ $item['product_nama_produk'] }}</h4>
                            <p>Rp {{ number_format($item['product_harga_produk']) }}</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        const productApiUrl = '{{ route('ShowWishlistPage') }}';
            $.getJSON(productApiUrl)
                .done(function(response) {
                    const products = response.data || [];
                    if (products.length === 0) {
                        $('#data-table').append('<tr><td colspan="4">No products available.</td></tr>');
                    } else {
                        let rows = '';
                        let rowCount = 0;
                        products.forEach(function(item) {
                            const productId = item.id;
                            const productName = item.nama_produk || "Unknown Product";
                            const productImage = `/images/product/${item.img_path}`;
                            const productPrice = item.harga_produk ? `Rp ${parseInt(item.harga_produk).toLocaleString()}` : "Price not available";
                            const productCategory = item.kategori || "Unknown Category";

                            if (rowCount === 0) {
                                rows += '<tr>';
                            }

                            rows += `
                                <td>
                                    <div class="product-item">
                                        <i class="far fa-heart favorite" onclick="toggleFavorite(this)"></i>
                                        <div class="product-image">
                                            <img alt="Product Image" height="200" src="${productImage}" width="auto" />
                                        </div>
                                        <div class="info">
                                            <div class="name">${productName}</div>
                                            <div class="price">${productPrice}</div>
                                            <div class="description">${productCategory}</div>
                                        </div>
                                        <div class="detail-button">
                                            <a href="{{ route('halamanProduk') }}?id=${productId}">Lihat Detail</a>
                                        </div>
                                    </div>
                                </td>
                            `;

                            rowCount++;
                            if (rowCount === 4) {
                                rows += '</tr>';
                                rowCount = 0;
                            }
                        });

                        if (rowCount > 0) {
                            rows += '</tr>';
                        }

                        $('#data-table').append(rows);
                    }
                })
                .fail(function() {
                    $('#data-table').append('<tr><td colspan="4">Failed to load data.</td></tr>');
                });
    </script>
</body>
</html>
