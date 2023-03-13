/** zdefiniowany model usera, jak nasz user wyglada */

/** importujemy joi do walidacji danych z req */
const Joi = require("joi");

const userSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().alphanum().min(3).required(),
  age: Joi.number().required().integer().min(18).max(150),
});

class User {
  constructor(id, name, age) {
    this.id = id;
    this.name = name;
    this.age = age;
  }
}

module.exports = { User, userSchema };
