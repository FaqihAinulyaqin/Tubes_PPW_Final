// apis/UserAPI.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

// Inisialisasi router
const router = express.Router();

// Secret key untuk JWT
const JWT_SECRET = 'your_jwt_secret_key';

// Konfigurasi koneksi ke database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tubes_everyday'
});

// Cek koneksi ke database
db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to MySQL database.');
    }
});

// Rute signup untuk memasukkan data ke database
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Mengecek apakah email sudah terdaftar
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already registered.' });
        }

        try {
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert data ke database
            db.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword],
                (err, results) => {
                    if (err) {
                        return res.status(500).json({ message: 'Database error.', error: err });
                    }
                    return res.status(201).json({ message: 'User created successfully.' });
                }
            );
        } catch (error) {
            return res.status(500).json({ message: 'Error while creating user.', error });
        }
    });
});

// Rute login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Mencari data user berdasarkan username
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error.', error: err });
        }
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const user = results[0];
        try {
            // Membandingkan password
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: 'Invalid credentials.' });
            }

            // Generate JWT token
            const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: 'Login successful.', token });
        } catch (error) {
            return res.status(500).json({ message: 'Error while logging in.', error });
        }
    });
});

// Ekspor router untuk digunakan di server
module.exports = router;
