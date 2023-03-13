const express = require("express");

const router = express.Router();

// otrzymujemy liste userow
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

// tworzymy usera
router.post("/", (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ msg: "Please provide a name for the user" });
    }
    throw Error("error"); // udajemy blad serwera 500
    res.status(200).json({ msg: "ok" });
  } catch (error) {
    res.status(500).send("ups, something went wrong");
  }
});

module.exports = { usersRouter: router };
