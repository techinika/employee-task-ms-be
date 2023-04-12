const express = require("express");
const { home, projects, reports, tasks, settings, add_task } = require("../controllers/admin");
const router = express.Router();

router.route("/").get(home);

router.route("/projects").get(projects);

router.route("/reports").get(reports);

router.route("/tasks").get(tasks);

router.route("/settings").get(settings);

router.route("/add_task").get(add_task);

module.exports = router;