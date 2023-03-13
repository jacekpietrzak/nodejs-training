const express = require("express");

const router = express.Router();

// tymczasowe dane mockup do celow testowych
const userTable = [
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

// otrzymujemy liste userow
router.get("/", (req, res) => {
  const response = userTable;
  res.json(response);
});

// otrzymujemy usera po id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = userTable.find((user) => user.id === id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    res.json(user);
  }
});

// tworzymy usera
router.post("/", (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send("Please provide a name for the user");
    } else {
      // throw Error("error"); // udajemy blad serwera 500
      res.status(200).json({ msg: "ok" });
    }
  } catch (error) {
    res.status(500).send("ups, something went wrong");
  }
});

module.exports = { usersRouter: router };
