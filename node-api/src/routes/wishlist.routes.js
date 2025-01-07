const express = require("express");
const router = express.Router();
const wishlistModel = require("../controller/wishlist.controller");

router.get("/getWishlist", wishlistModel.getWishlistHandler);
router.post("/addWishlist", wishlistModel.addWishlistHandler);
router.delete("/removeWishlist/:id", wishlistModel.removeWishlistHandler);

module.exports = router;

