<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile Picture</title>
    <link rel="stylesheet" href="{{ asset('css/profilePage.css') }}" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet" />
</head>

<body>
    <Nav>
        <div class="logo">
            <div class="img">
                <a href="/dashboard">
                    <img alt="Logo" src="{{ asset('images/auth/Group 39.png') }}" />

                </a>
            </div>
            <div class="dropdown">
                <select name="cars" id="dropdwn">
                    <option value="volvo">kategori</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select>

            </div>
        </div>
        <div class="container">
            <div class="icons">
                <a href="#"><i class="fas fa-heart"></i></a>
            </div>

            <div class="namauser">
                <a href="/profilePage" class="namauser" id="username"><i class="fas fa-user"></i> </a>
            </div>

            <div class="btnsell">
                <button>sell</button>
            </div>
        </div>
    </Nav>
    <main>
        <div class="profile">
            <h1>profile</h1>
            <div class="imageuser">
                <img src="{{ asset('images/default-img.png') }}" id="imgUser" class="fotouser" alt="img user">
            </div>

        </div>

        <div class="input">
            <form action="">
                <label for="nama">nama</label>
                <input type="text" id="nama">

                <label for="email">email</label>
                <input type="email" id="email">

                <label for="email">no telpon</label>
                <input type="tel" id="notelp">

                <label for="">alamat</label>
                <textarea name="alamat" id="alamat"></textarea>
            </form>
        </div>

        <div class="btn">
            <button class="logout">logout</button>
            <button class="save">save</button>
        </div>
    </main>
    <div class="mb"></div>

    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script>
        $(document).ready(function() {
            // Fetch user login
            const meAPI = '/getUserLogin'
            $.getJSON(meAPI)
                .done(function(response) {
                    const user = response.data || [];
                    console.log(user)
                    if (user.length === 0) {
                        $('#username').append('username');
                    } else {
                        const user = response.data[0];
                        $('#username').text(user.username);
                        $('#nama').val(`${user.nama_depan} ${user.nama_belakang}`);
                        $('#email').val(`${user.nama_depan} ${user.nama_belakang}`);
                        $('#notelp').val(`${user.nama_depan} ${user.nama_belakang}`);
                        $('#alamat').val(`${user.nama_depan} ${user.nama_belakang}`);
                        const imgSrc = user.img_path ? user.img_path : '{{ asset('images/default-img.png') }}';
                        $('#imgUser').attr('src', imgSrc);
                    }
                })
                .fail(function() {
                    $('#kategori-list').append('<a href="#">Failed to load categories</a>');
                });
        })
    </script>
</body>

</html>
