// Getting libraries and external functions or variables
const express = require("express");
const { login } = require("../controllers/auth");
const router = express.Router();

// Defining auth route
router.route("/").post(login);

module.exports = router;