// models/wishlist.js
const db = require("../config/db_connection");

const getWishlist = (user_id) => {
  const QUERY = `
    SELECT 
      wishlist.user_id, 
      produk.id AS product_id, 
      produk.img_path AS product_imgPath, 
      produk.nama_produk AS product_namaProduk, 
      produk.harga_produk AS product_hargaProduk, 
      produk.kategori AS product_kategori, 
      produk.sub_kategori AS product_subKategori
    FROM wishlist
    LEFT JOIN produk ON wishlist.product_id = produk.id 
    WHERE wishlist.user_id = ?`;
  try {
    return db.execute(QUERY, [user_id]);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};

const addWishlist = (user_id, product_id) => {
  const QUERY = `
    INSERT INTO wishlist (user_id, product_id, created_at) VALUES (?, ?, NOW())`;
  try {
    return db.execute(QUERY, [user_id, product_id]);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to add item to wishlist");
  }
};

const removeWishlist = async (id) => {
  const checkQuery = `
    SELECT COUNT(*) AS count 
    FROM wishlist 
    WHERE id = ?`;
  
  const deleteQuery = `
    DELETE FROM wishlist 
    WHERE id = ?`;
  
  try {
    // Cek apakah item ada di wishlist
    const [rows] = await db.execute(checkQuery, [id]);
    
    if (rows[0].count === 0) {
      // Jika tidak ada, kembalikan objek dengan affectedRows 0
      return { affectedRows: 0 }; 
    }

    // Jika ada, hapus item dari wishlist
    const [result] = await db.execute(deleteQuery, [id]);
    return result; // Kembalikan hasil dari query delete
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to remove item from wishlist");
  }
};

const searchWishlist = async (user_id, product_id) => {
  const QUERY = `
    SELECT * FROM wishlist 
    WHERE user_id = ? AND product_id = ?`;
  try {
    return db.execute(QUERY, [user_id, product_id]);
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to fetch data from the database");
  }
};

module.exports = {
  getWishlist,
  addWishlist,
  removeWishlist,
  searchWishlist
};