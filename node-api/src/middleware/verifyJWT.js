const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
        return res
            .status(401)
            .json({ message: 'Authorization header missing' });

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res
                .status(403)
                .json({ message: 'Invalid or expired token' });
        req.id = decoded.id;
        next();
    });
};

module.exports = verifyJWT;