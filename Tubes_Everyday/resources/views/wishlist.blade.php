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
            <img alt="Logo" src="{{ asset('images/auth/logo.png') }}" height="40" />
            <a href="#">Home</a>
            <a href="#">Categories</a>
            <a href="#"><i class="fas fa-user"></i> Username</a>
        </div>
    </div>
    <div class="container wishlist">
        <h2>Your Wishlist</h2>
        <div class="row">
            @foreach ($wishlists as $item)
                <div class="col-md-3 product-card">
                    <div class="product-item">
                        <i class="fas fa-heart remove-favorite" data-id="{{ $item->id }}"></i>
                        <img src="{{ $item->img_path }}" alt="{{ $item->nama_produk }}" class="product-image"/>
                        <div class="info">
                            <h4>{{ $item->nama_produk }}</h4>
                            <p>Rp {{ number_format($item->harga_produk) }}</p>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        $(document).on('click', '.remove-favorite', function() {
            const id = $(this).data('id');
            $.ajax({
                url: `/wishlist/${id}`,
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': '{{ csrf_token() }}' },
                success: function(response) {
                    alert('Removed from wishlist');
                    location.reload();
                },
                error: function() {
                    alert('Failed to remove item');
                }
            });
        });
    </script>
</body>
</html>
