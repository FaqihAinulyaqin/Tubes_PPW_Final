const express = require("express");
const router = express.Router();
const produkController = require("../controller/produk.controller");

router.get("/getProduk", produkController.getAllProdukHandler);
router.get("/getProdukExDesc", produkController.getAllProdukExDescHandler);
router.get("/getProduk/:id", produkController.getProdukByIdHandler)
router.get("/getProduk/:kategori", produkController.getProdukByCategoryHandler);
router.get("/getCategory", produkController.getCategoryHandler);
router.post("/addProduk", produkController.addProdukHandler);

module.exports = router;
