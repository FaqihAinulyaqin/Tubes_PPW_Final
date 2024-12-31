require("dotenv").config();
const modelWishlist = require("../models/wishlist");

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
  const { userId, productId } = req.body; 

  try {
    const [existing] = await modelWishlist.getWishlistByUserAndProduct(
      userId,
      productId
    );
    if (existing.length > 0) {
      return res.status(409).json({
        message: "Produk sudah ada di wishlist",
      });
    }

    const result = await modelWishlist.addWishlist(userId, productId);
    if (result.affectedRows > 0) {
      return res.status(201).json({
        message: "Produk berhasil ditambahkan ke wishlist",
      });
    }

    return res.status(400).json({
      message: "Gagal menambahkan produk ke wishlist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const removeWishlistHandler = async (req, res) => {
  const { wishlistId } = req.params; 

  try {
    const result = await modelWishlist.removeWishlist(wishlistId);
    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Produk berhasil dihapus dari wishlist",
      });
    }

    return res.status(404).json({
      message: "Produk tidak ditemukan di wishlist",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllWishlistHandler,
  addWishlistHandler,
  removeWishlistHandler,
};
