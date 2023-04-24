// Getting libraries and external functions or variables
const express = require("express");
const { 
    unfinished,
    finished,
    update,
    notifications,
    all_participants,
    dep_participants,
    settings,
    add_task,
} = require("../controllers/employee");
const validate_token = require("../middleware/validate_token");

const router = express.Router();
router.use(validate_token)

// Defining routes on ems/
router.get("/home/unfinished/:id", unfinished);
router.get("/home/finished/:id", finished)
router.post("/home/add_task", add_task)
router.post("/home/update/:id", update)
router.get("/notifications", notifications);
router.get("/participants", all_participants);
router.get("/participants/:id", dep_participants);
router.get("/settings", settings);

// Exporting area
module.exports = router;