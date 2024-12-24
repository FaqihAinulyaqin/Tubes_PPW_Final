const mysql = require('mysql2');
require("dotenv").config();

const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_ecommerce',
    port: 3306,
});

module.exports = dbConnection.promise();

