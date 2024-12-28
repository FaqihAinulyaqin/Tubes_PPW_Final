require("dotenv").config();
const modelProduk = require("../models/produk");

const getAllProduk = async (req, res) => {
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

const getProdukByCategory = async (req, res) => {
  const { kategori } = req.body;

  try {
    const [found] = await modelProduk.getProdukByCategory(kategori);
    if (found.length > 0) {
      return res
        .status(200)
        .json({ message: "Menampilkan semua produk", data: found });
    }
    return res.status(400).json({
      message: "Produk di kategori ini kosong",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllProduk,
  getProdukByCategory
};
