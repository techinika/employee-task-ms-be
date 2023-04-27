const express = require("express");
const { home, projects, reports, tasks, update, departments, dep_users, settings, add_task, all_users } = require("../controllers/admin");
const validate_token = require("../middleware/validate_token");
const router = express.Router();

router.use(validate_token)

// Defining Admin routes
router.route("/").get(home);

router.route("/projects").get(projects);

router.route("/reports").get(reports);

router.route("/tasks").get(tasks);

router.route("/update/:id").post(update);

router.route("/departments").get(departments);

router.route("/dep_users/:dep").post(dep_users);

router.route("/all_users").get(all_users);

router.route("/settings").get(settings);

router.route("/add_task").get(add_task);

module.exports = router;