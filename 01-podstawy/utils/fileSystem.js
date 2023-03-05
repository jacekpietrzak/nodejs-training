// Zaczynamy od inicjowania noda. Aby to zrobic uzywamy komendy "npm init" i po kolei wypelniamy pola. W skryptach do testowania uzyjemy "npm test" a reszta moze zostac. Zawsze mozna to pozniej zmienic. Po tym procesie utworzy nam sie plik package.json ktory jest glownym plikiem dowodzenia.

const { appendFile } = require("fs");

/** importujemy nasza zmienna srodowiskowa. */
const { config } = require("../config.js");

// console.log("hello world");
// aby uruchomic aplikacje noda nalezy w terminalu wpisac "node nazwa pliku" i enter
// aby zaimportowac jakis modul uzywamy klasycznej metody require('sciezka pliku lub nazwa modulu) i przyporzadkowujemy ja do zmiennej.
// fs = file system, promises - za pomoca tego wskazujemy ze chcemy korzystac w bibliotece z podczesci zajmujacej sie asynchronicznoscia.
const fs = require("fs").promises;

/** Czytanie pliku - Aby go odczytac to trzeba miec jakis plik.Stworzymy plik txt.Moze byc dowolny.
 * korzystamy z wbudowanej biblioteki nodejs, fs i jej metody readFile
 */
const readFile = async (filename) => {
  // sprawdzimy czy mozemy taki odczyt wykonac
  if (config.readingEnabled) {
    // wykonamy odczyt pliku
    const data = await fs.readFile(filename);
    //   console.log("data: ", data);
    // w tym momencie po uruchomieniu pliku dostaniemy dane z Buffer w formie liczb i cyfr. Nic co mozemy zrozumiec. Aby zrozumiec musimy sparsowac te dane i wywolac na data metode toString(). Ta metoda przeczyta nam tekst ale aby otworzyc innego typu pliki musimy uzyc innych metod do nich stworzonych.
    const parsedData = data.toString();
    //   console.log("parsedData: ", parsedData);
    console.log(parsedData);
    return parsedData;
  } else {
    console.log("Sorry, reading is not enabled.");
  }
};
// readFile();

/** Zapianie pliku - teraz zapiszemy sobie plik za pomoca metody writeFile z biblioteki fs.
 * Jesli jest ta sama nazwa pliku to writeFile nam nadpisze ten plik z nowymi danymi.
 */
const saveFile = async (filename, data) => {
  const dataToSave = data;
  //   await fs.writeFile("./newFile.txt", dataToSave);
  await fs.writeFile(filename, dataToSave);
};
// saveFile();

/** Polaczenie dwuch operacji */
const transaction = async () => {
  const fileName = await readFile();
  await saveFile(fileName);
};
// transaction();

/** dodanie do pliku
 * najpierw otworzymy istniejacy plik, zmienimy cos w nim i zapiszemy. Metoda appendFile nie nadpisuje a dodaje do pliku.
 */
const addToFile = async () => {
  await fs.appendFile("./newFile.txt", "some new data");
};
// addToFile();

/** Przeczytac zawartosc folderu */
const readDir = async () => {
  const files = await fs.readdir("./");
  console.log(files);
};

// readDir();

/** Jesli chcemy uzyc jakiejs metody z pliku fileSystem ktory utworzylismy to musimy ja zaimportowac. Niestety tutaj pracujemy na czystym nodejs czyli caly plik jest traktowany jako modul. W systemie modulowym jesli chcemy cos wyeksprotowac korzystamy z metody module.exports={tutaj umieszczamy wszystko co chcemy z modulu wyeksportowac.}
 * jesli chcemy nadac jakis alias danej metodzie dodajemy jako klucz nazwe ktora chcmey miec a wartosc jako nazwa eksportu
 */

module.exports = {
  // methodToReadFile: readFile,
  readFile,
  saveFile,
  addToFile,
  readDir,
};
