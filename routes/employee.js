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
const validate_token = require("../middleware/validate_token");

const router = express.Router();
router.use(validate_token)

// Defining routes on ems/
router.get("/home/unfinished/:id", unfinished);
router.get("/home/finished/:id", finished)
router.get("/notifications", notifications);
router.get("/participants", all_participants);
router.get("/participants/:id", dep_participants);
router.put("/settings", settings);

// Exporting area
module.exports = router;