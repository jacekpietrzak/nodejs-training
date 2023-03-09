const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const response = [
    {
      id: "1",
      name: "user1",
      mail: "user1@me.com",
    },
    {
      id: "2",
      name: "user2",
      mail: "user2@me.com",
    },
  ];
  res.json(response);
});

module.exports = { usersRouter: router };
