/** tworzymy glowny router */

const express = require("express");
const { usersRouter } = require("./users.js");
const { tasksRouter } = require("./tasks.js");
const { loginRouter } = require("./login.js");

const router = express.Router();

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);
router.use("/login", loginRouter);

module.exports = { routes: router };
