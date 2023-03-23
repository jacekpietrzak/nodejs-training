/** tworzymy glowny router */

const express = require("express");
const { usersRouter } = require("./users.js");
const { tasksRouter } = require("./tasks.js");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);

module.exports = { routes: router };
