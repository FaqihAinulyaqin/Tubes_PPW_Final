const conn = require("../config/db_connection");

const getAllProduk = () => {
  const QUERY = "SELECT * FROM produk";
  return conn.execute(QUERY);
};

const getProdukByCategory = (kategori) => {
  const QUERY = "SELECT * FROM produk WHERE kategori = ?";
  return conn.execute(QUERY, [kategori]);
};

module.exports = {
  getAllProduk,
  getProdukByCategory,
};
