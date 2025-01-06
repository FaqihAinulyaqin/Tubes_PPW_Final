const jwt = require("jsonwebtoken");
require("dotenv").config();
const modelProduk = require("../models/produk");
const JWT_SECRET = process.env.JWT_SECRET;

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

const getAllProdukExDescHandler = async (req, res) => {
  try {
    const [found] = await modelProduk.getAllProdukExDesc();
    if (found.length > 0) {
      return res
        .status(200)
        .json({ message: "Menampilkan semua produk Kecuali Deskripsi", data: found });
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

const getProdukByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
      const [found] = await modelProduk.getProdukByID(id);
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

const addProdukHandler = async (req, res) => {
  const idPenjual = req.id;

  try {
    const { img_path, nama_produk, harga_produk, stok, kategori, sub_kategori, deskripsi } = req.body;

    if (!img_path || !nama_produk || !harga_produk || !stok || !kategori || !sub_kategori || !deskripsi) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const [result] = await modelProduk.addProduk(
      idPenjual,
      img_path,
      nama_produk,
      harga_produk,
      stok,
      kategori,
      sub_kategori,
      deskripsi
    );
    
    const RS = {
      idPenjual,
      img_path,
      nama_produk,
      harga_produk,
      stok,
      kategori,
      sub_kategori,
      deskripsi
    }

    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Produk berhasil ditambahkan" });
    }

    return res.status(400).json({ message: "Gagal menambahkan produk" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


module.exports = {
  getAllProdukHandler,
  getProdukByIdHandler,
  getProdukByCategoryHandler,
  getCategoryHandler,
  getAllProdukExDescHandler,
  addProdukHandler
};
