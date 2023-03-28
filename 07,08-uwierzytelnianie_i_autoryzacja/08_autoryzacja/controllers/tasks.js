const { getUserById } = require("./users.js");
const { Task } = require("../models/task.js");

const createTaskForUser = async (userId, text) => {
  // pobieramy usera
  const user = await getUserById(userId);

  // inicjujemy taska
  const newTask = new Task({ text });

  // dodajemy taska do tablicy w userze
  user.tasks.push(newTask);

  // zapisujemy OBIEKT NADRZEDNY(!) czyli usera
  await user.save();
  return user;
};

const deleteTask = async (taskId) => {
  return Task.findByIdAndRemove({ _id: taskId });
};

const getTaskById = async (taskId) => {
  return Task.findOne({ _id: taskId });
};

module.exports = { createTaskForUser, deleteTask, getTaskById };
