const express = require("express");
const { 
    home,
    notifications,
    participants,
    settings
} = require("../controllers/employee");

// const { auth } = require("../controllers/auth");
const router = express.Router();

router.route("/").get(home);
router.route("/notifications").get(notifications);
router.route("/participants").get(participants);
router.route("/settings").get(settings);

module.exports = router;