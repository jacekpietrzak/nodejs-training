/** zdefiniowany model usera, jak nasz user wyglada */

// importujemy mongoose aby utworzyc model usera zgodny z mongo db
const mongoose = require("mongoose");

// importujemy model taska
const { taskSchema } = require("./task.js");

// Przydzielamy klase Schema do zmiennej
const Schema = mongoose.Schema;

/** importujemy joi do walidacji danych z req */
const Joi = require("joi");
const { boolean } = require("joi");
// ustalamy walidacje dla modelu
const userValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  age: Joi.number().required().integer().min(18).max(150),
});

// Zdefiniowalismy schemat obiektu jak bedzie wygladal
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "Unknown user",
  },
  age: {
    type: String,
    required: true,
    min: 18,
    max: 150,
  },
  tasks: [taskSchema],
});

// Definiujemy model wykorzystujacy schemat
const User = mongoose.model("user", userSchema);

module.exports = { User, userValidationSchema };
