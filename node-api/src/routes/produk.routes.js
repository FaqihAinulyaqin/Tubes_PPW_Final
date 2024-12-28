const express = require("express");
const router = express.Router();
const authModel = require("../controller/produk.controller");

router.get("/getProduk", authModel.getAllProduk);
router.get("/getProduk/{kategori}", authModel.getProdukByCategory)

module.exports = router;
