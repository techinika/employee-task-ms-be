// Getting libraries and external functions or variables
const express = require("express");
const { login, register } = require("../controllers/auth");
const router = express.Router();

// Defining auth route
router.route("/login").post(login);
router.route("/register").post(register);

module.exports = router;