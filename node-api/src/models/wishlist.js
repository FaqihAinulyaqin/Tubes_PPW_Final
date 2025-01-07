const db = require("../config/db_connection"); 

const getAllWishlist = () => {
  return db.execute("SELECT * FROM wishlists");
};

const getWishlistByID = (id) => {
  const QUERY = "SELECT * FROM wishlists WHERE id = ?";
  return db.execute(QUERY, [id]);
};

const getWishlistByUserAndProduct = (user_id, product_id) => {
  return db.execute(
    "SELECT * FROM wishlists WHERE user_id = ? AND product_id = ?",
    [user_id, product_id]
  );
};

const addWishlist = (user_id, product_id) => {
  return db.execute(
    "INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)",
    [user_id, product_id]
  );
};

const removeWishlist = (id) => {
  return db.execute("DELETE FROM wishlists WHERE id = ?", [id]);
};

const getWishlistByUser = (user_id) => {
  const QUERY = `
    SELECT w.id AS wishlist_id, p.id AS product_id, p.nama_produk, p.harga_produk, p.img_path
    FROM wishlists w
    JOIN produk p ON w.product_id = p.id
    WHERE w.user_id = ?`;
  return db.execute(QUERY, [user_id]);
};

module.exports = {
  getAllWishlist,
  getWishlistByID,
  getWishlistByUserAndProduct,
  addWishlist,
  getWishlistByUser,
  removeWishlist,
};
