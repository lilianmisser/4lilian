const express = require("express");
const router = express.Router();

// Require index controller
const index_controller = require("../../controllers/indexController.js");

// Require index controller
const user_controller = require("../../controllers/userController.js");

// GET main section
router.get("/", index_controller.index);

router.post("/signup", user_controller.signup)

module.exports = router;
