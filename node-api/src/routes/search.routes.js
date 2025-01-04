const express = require("express");
const router = express.Router();
const { searchProdukHandler } = require("../controller/search.controller.js");

// Rute pencarian produk
router.get("/searchProduk", searchProdukHandler);

module.exports = router;
