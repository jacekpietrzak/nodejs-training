const express = require("express");

const { getUserById } = require("../controllers/users.js");
const {
  createTaskForUser,
  deleteTask,
  getTaskById,
} = require("../controllers/tasks.js");

const router = express.Router();

// zapisujemy taska do usera po id
router.post("/:id", async (req, res) => {
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
    const { text } = req.body;
    const userWithTask = await createTaskForUser(id, text);
    return res.status(201).json({
      message: `Task: ${text}, created for: ${userWithTask.name}`,
      user: userWithTask,
    });
  } catch (err) {
    return res.status(500).send("Something went wrong");
  }
});

// ponizsze do zrobienia
// znajdujemy taska po id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
});

// usuwamy taska po po id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);
    return deleteTask(id);
  } catch (err) {}
});

module.exports = { tasksRouter: router };
