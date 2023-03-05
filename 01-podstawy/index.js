/** Jesli chcemy uzyc jakiejs metody z pliku fileSystem ktory utworzylismy to musimy ja zaimportowac. Niestety tutaj pracujemy na czystym nodejs czyli caly plik jest traktowany jako modul. W systemie modulowym jesli chcemy cos wyeksprotowac korzystamy z metody module.exports={tutaj umieszczamy wszystko co chcemy z modulu wyeksportowac.}
 * przy imporcie jesli eksportowalismy wiecej niz jedna metoda to byl to obiekt. Dlatego importujemy rowniez obiekt i w nim podajemy co z tego obiektu potrzebujemy. to sie rowna require('sciezka do pliku')
 */

/** WAZNE - trzeba zapamietac ze kolejnosc importow ma ogromne znaczenie. Jesli zaimportujemy funkcje ktora potrzebuje jakiejs zmiennej ktora jest budowana za pomoca jakeijs biblioteki i ta biblioteka bedzie importowana pozniej niz funkcja to efektem bedzie undefined gdyz w danym momencie gdy funkcja sie wykonuje tej zmiennej jeszcze nie ma. */

/** w node js mozemy korzystac z globalnych zmiennych. Ona jest dostepna w calej aplikacji. Zazwyczaj robi sie plik config.js w ktorym przechowujemy globalne zmienne. */
/** aby ta zmienna odczytac musimy zaimportowac .env */
const dotenv = require("dotenv");
/** i do tego musimy mu powiedziec zeby sie uruchomil */
dotenv.config();

const { config } = require("./config");

console.log(config.readingEnabled);

const {
  readFile,
  saveFile,
  addToFile,
  readDir,
} = require("./utils/fileSystem.js");

readFile("newFile.txt");

// saveFile(
//   "./anotherFilte.txt",
//   "something something dark side. Somethin something, complete."
// );
