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

const { userValidationSchema } = require("../models/user.js");

const { auth } = require("../auth/auth.js");
const { roles } = require("../config.js");
const { admin, user } = roles;

const router = express.Router();

// pobieramy liste userow ZABEZPIECZONE AUTENTYKACJA
router.get("/", auth(admin), async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// pobieramy usera by id
router.get("/:id", auth(admin), async (req, res) => {
  // musimy zrobic walidacje poprawnosci id. id w mongodb musi miec 12 znakow

  const { id } = req.params;
  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).send("No user with this id");
    }
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
});

// Tworzymy usera
router.post("/", auth(admin), async (req, res) => {
  // nie trzymamy tutaj logiki

  // odpalamy walidacje
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    // jezeli mamy blad walidacji to powiadamiamy uzytkownika
    return res.status(400).send(error.details[0].message);
  }

  try {
    // mozemy dokonac destrukturyzacje bo nasze req.body jest zwalidowane
    const { email, age, password } = req.body;
    // tworzymy usera
    const user = await createUser(email, age, password);
    // zwracamy nowo stworzonego usera
    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// usuwamy usera
router.delete("/:id", auth(admin), async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    // console.log(user);
    if (!user) {
      return res.status(404).send("No user with this id");
    }
    await deleteUser(id);
    return res.status(204).send("User removed successfully");
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// aktualizacja usera
router.put("/:id", auth(admin, user), async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("ID is required");
  }

  // musimy zrobic walidacje poprawnosci id. id w mongodb musi miec 12 znakow
  if (id.length !== 24) {
    return res
      .status(400)
      .json({ message: "Id needs to be 24 character long" });
  }

  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    // jezeli mamy blad walidacji to powiadamiamy uzytkownika
    res.status(400).send(error.details[0].message);
  }

  const user = await getUserById(id);
  if (!user) {
    return res.status(404).send("No user with this id");
  }

  try {
    const updatedUser = await updateUser(id, req.body);
    return res.status(200).json({
      message: "User updated successfully",
      updatedUser: updatedUser,
    });
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = { usersRouter: router };
