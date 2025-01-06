const express = require("express");
const router = express.Router();
const produkController = require("../controller/produk.controller");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/getProduk", produkController.getAllProdukHandler);
router.get("/getProdukExDesc", produkController.getAllProdukExDescHandler);
router.get("/getProdukById/:id", produkController.getProdukByIdHandler)
router.get("/getProduk/:kategori", produkController.getProdukByCategoryHandler);
router.get("/getCategory", produkController.getCategoryHandler);
router.post("/addProduk", verifyJWT, produkController.addProdukHandler);

module.exports = router;
