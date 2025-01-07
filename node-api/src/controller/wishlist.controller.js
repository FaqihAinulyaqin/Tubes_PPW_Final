require("dotenv").config();
const modelWishlist = require("../models/wishlist");
const JWT_SECRET = "your_jwt_secret_key";
const jwt = require("jsonwebtoken");

const getAllWishlistHandler = async (req, res) => {
  try {
    const [found] = await modelWishlist.getAllWishlist();
    if (found.length > 0) {
      return res
        .status(200)
        .json({ message: "Menampilkan semua wishlist", data: found });
    }
    return res.status(400).json({
      message: "Tidak ada item dalam wishlist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const addWishlistHandler = async (req, res) => {
  const { product_id } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Token tidak ditemukan" });
  }

  if (!product_id ) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user_id = decoded.id;

      const [result] = await modelWishlist.addWishlist(user_id, product_id);
      console.log("Hasil addWishlist:", result);

      if (result.affectedRows > 0) {
          return res.status(201).json({ message: "Wishlist berhasil ditambahkan" });
      }

      return res.status(400).json({ message: "Gagal menambahkan Wishlist" });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getWishlistByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
      const [found] = await modelWishlist.getWishlistByID(id);
      if (found.length > 0) {
          return res.status(200).json({
              message: "Menampilkan produk dengan id " + id,
              data: found,
          });
      }
      return res.status(404).json({
          message: "Produk dengan id tersebut tidak ada",
      });
  } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({
          message: "Server error",
          error: error.message,
      });
  }
};

const getWishlistByUserHandler = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID diperlukan" });
  }

  try {
    const [wishlists] = await modelWishlist.getWishlistByUser(user_id);
    if (wishlists.length > 0) {
      return res.status(200).json({ message: "Wishlist ditemukan", data: wishlists });
    }
    return res.status(404).json({ message: "Wishlist kosong" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const removeWishlistHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [found] = await modelWishlist.getWishlistByID(id);
    if (found.length === 0) {
      return res.status(404).json({ message: "Wishlist item not found" });
    }

    const result = await modelWishlist.removeWishlist(id);
    console.log("Result from removeWishlist:", result);

    return res.status(200).json({
      message: `Produk dengan ID ${id} telah dihapus.`,
    });
  } catch (error) {
    console.error("Error saat menghapus wishlist:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



module.exports = {
  getWishlistByIdHandler,
  getAllWishlistHandler,
  addWishlistHandler,
  removeWishlistHandler,
  getWishlistByUserHandler
};