const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Joi = require("joi");

const taskSchema = new Schema({
  text: String,
});

const Task = mongoose.model("task", taskSchema);

module.exports = { Task, taskSchema };
