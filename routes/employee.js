// Getting libraries and external functions or variables
const express = require("express");
const { 
    unfinished,
    finished,
    notifications,
    all_participants,
    dep_participants,
    settings,
} = require("../controllers/employee");

const router = express.Router();

// Defining routes on ems/
router.route("/home/unfinished/:id").get(unfinished);
router.route("/home/finished/:id").get(finished)
router.route("/notifications").get(notifications);
router.route("/participants").get(all_participants);
router.route("/participants/:id").get(dep_participants);
router.route("/settings").put(settings);

// Exporting area
module.exports = router;