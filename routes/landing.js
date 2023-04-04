const express = require("express");
// const { auth } = require("../controllers/auth");
const router = express.Router();

router.route("/login").post((req, res) => {
    console.log(req.body);
    res.send(`Welcome ${req.body}`)
});

module.exports = router;