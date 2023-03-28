const express = require("express");

const {
  createBook,
  getAllBooks,
  getBookByTitle,
} = require("../controllers/books.js");

const { auth } = require("../auth/auth.js");
const { roles } = require("../config.js");
const { admin, user } = roles;

const { bookValidationSchema } = require("../models/book.js");
const router = express.Router();

// pobieramy wszysktie ksiazki
router.get("/", auth(admin, user), async (req, res) => {
  try {
    const books = await getAllBooks();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// pobieramy ksiazke po tytule
router.get("/:title", auth(admin, user), async (req, res) => {
  try {
    const { title } = req.params;
    const book = await getBookByTitle(title);
    if (!book) {
      return res.status(404).json({ message: "No book with this title" });
    }
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// tworzymy ksiazke
router.post("/", auth(admin, user), async (req, res) => {
  // walidujemy poprawnosc danych w body
  const { error } = bookValidationSchema.validate(req.body);

  if (error) {
    // jezeli mamy blad walidacji to powiadamiamy uzytkownika
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // mozemy dokonac destrukturyzacje bo nasze req.body jest zwalidowane
    const { title } = req.body;
    // tworzymy ksiazke
    const newBook = await createBook(title);
    // zwracamy nowo utworzona ksiazke
    return res.status(200).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = { booksRouter: router };
