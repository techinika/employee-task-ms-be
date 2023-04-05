const express = require("express");
const { home, projects, reports, tasks, settings } = require("../controllers/admin");
const router = express.Router();

router.route("/").post(home);

router.route("/projects").post(projects);

router.route("/reports").post(reports);

router.route("/tasks").post(tasks);

router.route("/settings").post(settings);

module.exports = router;