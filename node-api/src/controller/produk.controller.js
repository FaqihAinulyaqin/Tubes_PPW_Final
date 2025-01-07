const modelProduk = require("../models/produk");
const path = require("path");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const firebaseConfig = require("../config/firebase.config");


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
      return res.status(200).json({
        message: "Menampilkan semua produk Kecuali Deskripsi",
        data: found,
      });
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
  const fotoProduk = req.file;
  const { nama_produk, harga_produk, stok, kategori, sub_kategori, deskripsi } =
    req.body;

  try {
    if (
      !fotoProduk ||
      !nama_produk ||
      !harga_produk ||
      !stok ||
      !kategori ||
      !sub_kategori ||
      !deskripsi
    ) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    const pathFotoProduk = await uploadNewProfilePicture(fotoProduk);

    const [result] = await modelProduk.addProduk(
      idPenjual,
      pathFotoProduk,
      nama_produk,
      harga_produk,
      stok,
      kategori,
      sub_kategori,
      deskripsi
    );


    if (result.affectedRows > 0) {
      return res.status(201).json({ message: "Produk berhasil ditambahkan" });
    }

    return res.status(400).json({ message: "Gagal menambahkan produk" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const uploadNewProfilePicture = async (profilePictFile) => {
  if (!profilePictFile) {
    throw new Error("File tidak valid");
  }

  const profilePictFileExtension = path.extname(profilePictFile.originalname);
  const profilePictFileOriginalName = path.basename(
    profilePictFile.originalname,
    profilePictFileExtension
  );
  const newProfilePictfileName = `${Date.now()}_${profilePictFileOriginalName}${profilePictFileExtension}`;
  const { firebaseStorage } = await firebaseConfig();
  const storageRef = ref(
    firebaseStorage,
    `amar-project/foto-produk/${newProfilePictfileName}`
  );

  const profilePictBuffer = profilePictFile.buffer;

  const resultProfilePict = await uploadBytes(storageRef, profilePictBuffer, {
    contentType: profilePictFile.mimetype,
  });

  return await getDownloadURL(resultProfilePict.ref);
};

module.exports = {
  getAllProdukHandler,
  getProdukByIdHandler,
  getProdukByCategoryHandler,
  getCategoryHandler,
  getAllProdukExDescHandler,
  addProdukHandler,
};
