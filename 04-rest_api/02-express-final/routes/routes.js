/** tworzymy glowny router */

const express = require("express");
const { usersRouter } = require("./users.js");

const router = express.Router();

router.use("/users", usersRouter);

module.exports = { routes: router };
