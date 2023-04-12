const express = require("express");
const app = express();
// importujemy zmienne srodowiskowe
require("dotenv").config({ path: "./.env" });

const morgan = require("morgan");

// importujemy glowny router
const { routes } = require("./routes/routes.js");

// modul do obslugi sciezek plikow
const path = require("path");

// modul do obslugi bledow natywna z nodejs
const createError = require("http-errors");

// modul do obslugi plikow
const fs = require("fs").promises;

// biblioteka do obslugi przychodzacych plikow
const multer = require("multer");

// helper do obslugi folderow
const { createFolderIfNotExist } = require("./helpers.js");

// laczymy sie z baza danych mongo
const { connectDataBase } = require("./startup/database.js");
connectDataBase();

// importujemy metode do tworzenia ksiazek
const { createBook } = require("./controllers/books.js");

// precyzujemy sciezke przechowanie pliku - folder
const storeImagePath = path.join(process.cwd(), "images"); // bardziej pro podejscie. Jesli ktos stworzyl biblioteke w node js do obslugi sceizek to z niej korzystajmy
// mozemy tez skozystac z js do stworzenia path
const storePath = `${process.cwd()}/images`;

// musimy zainicjalizowac storage w ktorym sprecyzujemy pewne opcje
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // multer to middleware
    cb(null, storeImagePath); // podajemy sciezke gdzie ten storage chcemy umiescic (cb - callback - mozna powiedziec ze odpowiednik next)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // podajemy jaka ma byc nazwa pliku. W tym wypadku oryginalna nazwa.
  },
  limits: {
    // definiujemy limity aby ktos nam nie zapchal serwera.
    fileSize: 1048576, // wielkosc pliku w bajtach - tutaj 1mb
  },
});

// obslugujemy przychodzacy obrazek przy pomocy multera
const upload = multer({ storage: storage });

app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

app.post("/upload", upload.single("picture"), async (req, res, next) => {
  // wyciagamy dane na temat przychodzacego pliku

  const { path: temporaryName, originalname: originalName } = req.file;
  const { title } = req.body;

  // tworzymy sciezke absolutna do PLIKU docelowego z tymczasowa nazwa. Nazwa pliku jest taka sama jak nazwa pliku przychodzacego
  const fileName = path.join(storeImagePath, originalName);

  // jak ten plik juz istnieje to mozemy zmienic jego nazwe na docelowa. Robimy try catch poniewaz jesli sie cos pojdzie nie tak to znaczy ze cos sie wykrzaczylo z uploadem pliku i hcemy do obsluzyc.

  try {
    // podmieniamy nazwe tymczasowa na wlasciwa
    await fs.rename(temporaryName, fileName);

    // przyklad dodawania okladki ksiazki na podstawie poprzednich zajec
    // wrzucamy nasz plik do cloud storage ===> otrzymujemy path

    // zapisujemy sciezke do bazy danych
    const book = await createBook(title, fileName);
    console.log(book);
  } catch (error) {
    // jesli sie nie udalo to wywal ten plik tymczasowy i zwracamy error
    await fs.unlink(temporaryName);
    // pusc dalej ale jako argument przekaz error
    return next(error);
  }

  return res.status(200).send("file upload success");
});

// piszemy middleware do obslugi bledow z pomoca natywnej biblioteki z nodejs: http-errors
app.use((req, res, next) => {
  next(createError(404));
});

// jesli pojawi sie argument err to dajemy ten middleware
app.use((err, req, res, next) => {
  //jesli ma okreslony status to niech da status a jesli nie to niech da 500
  res.status(err.status || 500);

  // json ktory wyslemy do uzytkownika
  res.json({ errorMessage: err.message, status: err.status });
});

app.listen(3000, () => {
  createFolderIfNotExist(storeImagePath);
  console.log(`App is listening on port 3000`);
});
