/** zdefiniowany model usera, jak nasz user wyglada */

// importujemy mongoose aby utworzyc model usera zgodny z mongo db
const mongoose = require("mongoose");

// importujemy bcrypt do hashowania hasla.
const bcrypt = require("bcrypt");

// importujemy model taska
const { taskSchema } = require("./task.js");

// Przydzielamy klase Schema do zmiennej
const Schema = mongoose.Schema;

/** importujemy joi do walidacji danych z req */
const Joi = require("joi");

// Zdefiniowalismy schemat obiektu jak bedzie wygladal
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: String,
    min: 18,
    max: 150,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  tasks: [taskSchema],
});

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(pass, salt);
  return hashedPassword;
};

// sprawdzanie metody czy dziala.
// console.log(hashPassword("testowehaslo123"));

// ustalamy walidacje dla modelu
const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(18).max(150),
  password: Joi.string().required().min(6),
});

// Definiujemy model wykorzystujacy schemat
const User = mongoose.model("user", userSchema);

module.exports = { User, userValidationSchema, hashPassword };
