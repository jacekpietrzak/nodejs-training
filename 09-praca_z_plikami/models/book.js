const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Joi = require("joi");

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    coverImageUrl: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const bookValidationSchema = Joi.object({
  title: Joi.string().required(),
});

const Book = mongoose.model("Book", bookSchema);

module.exports = { Book, bookValidationSchema };
