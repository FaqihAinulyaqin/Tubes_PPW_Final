<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>

    <title>Halaman Utama</title>
</head>
<body>
    <div class="container header">
        <div>
            <img alt="Logo" height="40" src="{{ asset('images/auth/Group 39.png') }}" width="40" />
            <div class="dropdown">
                <a>Categories<i class="fas fa-chevron-down"></i></a>
                <div class="dropdown-content">
                    <a href="#">Category 1</a>
                    <a href="#">Category 2</a>
                    <a href="#">Category 3</a>
                </div>
            </div>
        </div>           
        <div class="nav">
            <a href="#"><i class="fas fa-search"></i></a>
            <a href="#"><i class="fas fa-heart"></i></a>
            <a href="#"><i class="fas fa-user"></i> Username </a>
            <a class="sell" href="#">Sell</a>
        </div>
    </div>
    <div class="container promo">
        <div>
            <div class="promo-description">
                Promo Description
            </div>
            <button class="buy-now">Buy Now</button>
        </div>
        <div class="ongoing-promo">
            Ongoing Promo
        </div>
    </div>
    <div class="recommendation">
        <h2>Recommendation</h2>
        <table id="data-table">
            <!-- Data Produk akan dimuat di sini -->
        </table>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        $(document).ready(function() {
            const apiUrl = '/getProduk'; // Endpoint Laravel Anda

            $.getJSON(apiUrl)
                .done(function(response) {
                    const data = response.data;

                    if (!data || data.length === 0) {
                        $('#data-table').append('<tr><td colspan="4">No products available.</td></tr>');
                        return;
                    }

                    let rows = '';
                    let rowCount = 0;

                    $.each(data, function(index, item) {
                        const productName = item.nama_produk || "Unknown Product";
                        const productImage = item.img_path || 'https://via.placeholder.com/150';
                        const productPrice = item.harga_produk ? `Rp ${item.harga_produk.toLocaleString()}` : "Price not available";
                        const productCategory = item.kategori || "Unknown Category";

                        if (rowCount === 0) {
                            rows += '<tr>';
                        }

                        rows += `
                            <td>
                                <div class="product-item">
                                    <i class="far fa-heart favorite" onclick="toggleFavorite(this)"></i>
                                    <div class="product-image">
                                        <img alt="Product Image" height="200" src="${productImage}" width="150" />
                                    </div>
                                    <div class="info">
                                        <div class="name">${productName}</div>
                                        <div class="price">${productPrice}</div>
                                        <div class="description">${productCategory}</div>
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
                })
                .fail(function() {
                    $('#data-table').append('<tr><td colspan="4">Failed to load data.</td></tr>');
                });
        });

        function toggleFavorite(icon) {
            $(icon).toggleClass('fas far');
        }
    </script>
</body>
</html>
