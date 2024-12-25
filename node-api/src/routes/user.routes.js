const express = require("express")
const router = express.Router()
const usersController = require("../controller/users.controller")

router.get("/getAllUser", usersController.getAllUser)

module.exports = router;