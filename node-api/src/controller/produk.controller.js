require("dotenv").config();
const modelProduk = require("../models/produk");

const getAllProdukHandler = async (req, res) => {
  try {
    const [found] = await modelProduk.getAllProduk();
    if (found.length > 0) {
      return res
        .status(200)
        .json({ message: "Menampilkan semua produk", data: found });
    }
    return res.status(400).json({
      message: "Tidak ada produk",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProdukByCategoryHandler = async (req, res) => {
  const { kategori } = req.params; // Mengambil kategori dari parameter URL

  try {
    const [found] = await modelProduk.getProdukByCategory(kategori);
    if (found.length > 0) {
      return res.status(200).json({
        message: "Menampilkan semua produk di kategori " + kategori,
        data: found,
      });
    }
    return res.status(404).json({
      message: "Produk di kategori ini kosong",
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getCategoryHandler = async (req, res) => {
  try {
    const [found] = await modelProduk.getCategory();
    if (found.length > 0) {
      return res
        .status(200)
        .json({ message: "Menampilkan semua kategori", data: found });
    }
    return res.status(400).json({
      message: "Tidak ada kategori",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllProdukHandler,
  getProdukByCategoryHandler,
  getCategoryHandler,
};
