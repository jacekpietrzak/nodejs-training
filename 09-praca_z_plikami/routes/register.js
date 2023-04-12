const express = require("express");
const { userValidationSchema } = require("../models/user");
const { createUser, getUserByEmail } = require("../controllers/users.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = userValidationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newUser = await getUserByEmail(req.body.email);
  if (newUser) {
    return res
      .status(409)
      .json({ message: "The email address already exists." });
  }

  try {
    const { email, age, password, role } = req.body;
    const user = await createUser(email, age, password, role);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { registerRouter: router };
