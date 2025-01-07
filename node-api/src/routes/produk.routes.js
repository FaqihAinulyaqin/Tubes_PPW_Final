const express = require("express");
const router = express.Router();
const produkController = require("../controller/produk.controller");
const verifyJWT = require("../middleware/verifyJWT");
const multer = require('../middleware/multer')

router.get("/getProduk", produkController.getAllProdukHandler);
router.get("/getProdukExDesc", produkController.getAllProdukExDescHandler);
router.get("/getProdukById/:id", produkController.getProdukByIdHandler)
router.get("/getProduk/:kategori", produkController.getProdukByCategoryHandler);
router.get("/getCategory", produkController.getCategoryHandler);
router.post("/addProduk", multer.single('foto'), verifyJWT, produkController.addProdukHandler);

module.exports = router;
