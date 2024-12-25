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

const addUser = async (username, email, plainPassword) => {
  const QUERY = "INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, ?)";
  const salt = 10;
  const time = Date.now();
  const hashed = await bcrypt.hash(plainPassword, salt);
  return conn.execute(QUERY, [username, email, hashed, time]);
};

module.exports = {
  getAllUser,
  getUserByEmail,
  getUserByID,
  addUser,
};
