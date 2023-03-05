const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
require("colors");
program.option(
  "-f, --file [type]",
  "file for saving game results",
  "results.txt"
);
program.parse(process.argv);

const rl = readline.createInterface({
  input: process.stdin, // wprowadzenie ze standardowego strumienia
  output: process.stdout, // wyprowadzenie do standardowego strumienia
});

let count = 0;
const logFile = program.opts().file;
const mind = Math.floor(Math.random() * 10) + 1;

const isValid = (value) => {
  if (isNaN(value)) {
    console.log("Wprowadz liczbe!".red);
    return false;
  }
  if (value < 1 || value > 10) {
    console.log("Liczba powinna znajdowac sie w przedziale od 1 do 10".red);
    return false;
  }
  return true;
};

const logResult = async (data) => {
  try {
    await fs.appendFile(logFile, `${data}\n`);
    console.log(`Udalo sie zapisac rezultat w pliku ${logFile}`.green);
  } catch (error) {
    console.log(`Nie udalo sie zapisac pliku ${logFile}`.red);
  }
};

const game = () => {
  rl.question(`Wprowadz liczbe od 1 do 10, aby zgadywac: `.yellow, (value) => {
    let a = +value;
    if (!isValid(a)) {
      game();
      return;
    }
    count += 1;
    if (a === mind) {
      console.log(`Gratulacje. Odgadles liczbe za %d razem`.green, count);
      // console.log(`Gratulacje. Odgadles liczbe za ${count} razem`.green, count);
      logResult(
        `${new Date().toLocaleDateString()}: Gratulacje. Liczba to ${mind}. Odgadles ja za ${count} razem. `
      ).finally(() => rl.close());
      return;
    }
    console.log(`Nie zgadles. Kolejna proba.`.red);
    game();
  });
};

game();
