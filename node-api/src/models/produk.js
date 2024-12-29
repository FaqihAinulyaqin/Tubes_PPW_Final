const conn = require("../config/db_connection");

const getAllProduk = () => {
  const QUERY = "SELECT * FROM produk";
  try {
    return conn.execute(QUERY);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};

const getProdukByCategory = async (kategori) => {
  const QUERY = "SELECT * FROM produk WHERE kategori = ?";
  try {
    return await conn.execute(QUERY, [kategori]);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};

const getCategory = () => {
  const QUERY = "SELECT kategori FROM produk GROUP BY kategori";
  try {
    return conn.execute(QUERY);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
}

module.exports = {
  getAllProduk,
  getProdukByCategory,
  getCategory
};
