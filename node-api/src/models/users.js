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

const addUser = async (nama_depan, nama_belakang, username, email, plainPassword) => {
  const QUERY = "INSERT INTO users (nama_depan, nama_belakang, username, email, password, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
  const salt = 10;
  const hashed = await bcrypt.hash(plainPassword, salt);
  return conn.execute(QUERY, [nama_depan, nama_belakang, username, email, hashed]);
};

const updateFotoProfile = async (id, img_path) => {
  const QUERY = ""
}

// 1 FE laravel BE node
// 2 FE node BE laravel

module.exports = {
  getAllUser,
  getUserByEmail,
  getUserByID,
  addUser,
};
