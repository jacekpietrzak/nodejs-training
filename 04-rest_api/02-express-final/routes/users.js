/** tworzymy router dla users */

const express = require("express");

// importujemy kontroler
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/users.js");
const { userSchema } = require("../models/user.js");

const router = express.Router();

// pobieramy liste userow
router.get("/", (req, res) => {
  try {
    const users = getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// pobieramy usera by id
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    if (!user) {
      return res.status(404).send("No user with this id");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// Tworzymy usera
router.post("/", (req, res) => {
  // nie trzymamy tutaj logiki

  // odpalamy walidacje
  const { error } = userSchema.validate(req.body);
  if (error) {
    // jezeli mamy blad walidacji to powiadamiamy uzytkownika
    // res.status(400).send(error);
    res.status(400).send(error.details[0].message);
  }

  try {
    // mozemy dokonac destrukturyzacje bo nasze req.body jest zwalidowane
    console.log("req.body:", req.body);
    const { id, name, age } = req.body;
    // tworzymy usera
    const user = createUser(id, name, age);
    console.log("user", user);
    // zwracamy nowo stworzonego usera
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// usuwamy usera
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID is required");
  }
  try {
    const user = getUserById(id);
    if (!user) {
      return res.status(404).send("No user with this id");
    }
    deleteUser(id);
    return res.status(204).send("User removed successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// aktualizacja usera
router.put("/:id", (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID is required");
  }

  const { error } = userSchema.validate(req.body);

  if (error) {
    // jezeli mamy blad walidacji to powiadamiamy uzytkownika
    res.status(400).send(error.details[0].message);
  }

  const user = getUserById(id);
  if (!user) {
    return res.status(404).send("No user with this id");
  }

  try {
    updateUser(id, req.body);
    return res.status(200).send("User updated successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = { usersRouter: router };
