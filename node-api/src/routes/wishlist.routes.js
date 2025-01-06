const express = require("express");
const router = express.Router();
const wishlistModel = require("../controller/wishlist.controller");

router.get("/getWishlist", wishlistModel.getAllWishlistHandler);
router.get("/getWishlistById/:id", wishlistModel.getWishlistByIdHandler);

router.post("/addWishlist", wishlistModel.addWishlistHandler);
router.delete("/removeWishlist/:id", wishlistModel.removeWishlistHandler);
router.get("/wishlist/getWishlistByUser", wishlistModel.getWishlistByUserHandler);

module.exports = router;
