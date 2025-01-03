const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res
            .status(401)
            .json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    console.log('Received Token:', token); // Debugging line to check the token

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Error verifying token:', err); // Log the error for better debugging
            return res
                .status(403)
                .json({ message: 'Invalid or expired token' });
        }

        req.id = decoded.id; // Store decoded user info in req
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyJWT;
