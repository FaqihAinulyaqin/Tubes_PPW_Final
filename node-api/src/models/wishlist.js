const db = require("../config/db"); 

const getAllWishlist = () => {
  return db.execute("SELECT * FROM wishlist");
};

const getWishlistByUserAndProduct = (userId, productId) => {
  return db.execute(
    "SELECT * FROM wishlist WHERE userId = ? AND productId = ?",
    [userId, productId]
  );
};

const addWishlist = (userId, productId) => {
  return db.execute(
    "INSERT INTO wishlist (userId, productId) VALUES (?, ?)",
    [userId, productId]
  );
};

const removeWishlist = (wishlistId) => {
  return db.execute("DELETE FROM wishlist WHERE id = ?", [wishlistId]);
};

module.exports = {
  getAllWishlist,
  getWishlistByUserAndProduct,
  addWishlist,
  removeWishlist,
};
