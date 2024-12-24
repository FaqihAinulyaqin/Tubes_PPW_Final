// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Mengimpor file API
const UserAPI = require('./API/UserAPI');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Menggunakan middleware untuk UserAPI
app.use('/api/users', UserAPI);

// Menyediakan rute default
app.get('/', (req, res) => {
    res.send('Welcome to the API Server!');
});

// Mulai server
app.listen(port, () => {
    console.log(`Node.js API listening at http://localhost:${port}`);
});
