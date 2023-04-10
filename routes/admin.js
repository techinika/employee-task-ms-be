const express = require("express");
const { home, projects, reports, tasks, settings, add_task } = require("../controllers/admin");
const router = express.Router();

router.route("/").get(home);

router.route("/projects").post(projects);

router.route("/reports").post(reports);

router.route("/tasks").post(tasks);

router.route("/settings").post(settings);

router.route("/add_task").post(add_task);

module.exports = router;