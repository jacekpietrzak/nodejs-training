const { Book } = require("../models/book.js");

const createBook = async (title, coverImageUrl) => {
  // inicjujemy nowa ksiazke
  const newBook = new Book({ title, coverImageUrl });

  // zapisujemy ksiazke
  await newBook.save();

  // zwracamy ksiazke
  return newBook;
};

const getAllBooks = async () => {
  const books = await Book.find();
  return books;
};

const getBookByTitle = async (bookTitle) => {
  const book = await Book.find({
    title: { $regex: bookTitle, $options: "i" },
  });
  return book;
};

module.exports = { createBook, getAllBooks, getBookByTitle };
