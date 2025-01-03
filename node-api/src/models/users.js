const conn = require("../config/db_connection");
const bcrypt = require("bcrypt");

const getAllUser = () => {
  const QUERY = "SELECT * FROM users";
  return conn.execute(QUERY);
};

const getUserByEmail = (email) => {
  const QUERY = "SELECT * FROM users WHERE email = ?";
  return conn.execute(QUERY, [email]);
};

const getUserByID = (id) => {
  const QUERY = "SELECT * FROM users WHERE id = ?";
  return conn.execute(QUERY, [id]);
};

const addUser = async (username, email, plainPassword, nomorWA) => {
    const QUERY = "INSERT INTO users (profilePic, username, email, password, nomorWA, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    const salt = 10;
    const time = Date.now();
    const profilePicture = "/images/auth/PP.png"
    const hashed = await bcrypt.hash(plainPassword, salt);
    return conn.execute(QUERY, [profilePicture, username, email, hashed, nomorWA, time]);
};

module.exports = {
  getAllUser,
  getUserByEmail,
  getUserByID,
  addUser,
};
