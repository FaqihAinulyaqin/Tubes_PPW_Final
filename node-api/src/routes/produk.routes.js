const express = require("express");
const router = express.Router();
const authModel = require("../controller/produk.controller");

router.get("/getProduk", authModel.getAllProdukHandler);
router.get("/getProduk/:kategori", authModel.getProdukByCategoryHandler);
router.get("/getCategory", authModel.getCategoryHandler);

module.exports = router;
