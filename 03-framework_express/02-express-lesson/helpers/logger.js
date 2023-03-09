/** utworzylismy plik z funkcja middleware w tym przypadku logger */

const logger = (req, res, next) => {
  console.log("przychodzacy request z logger middleware w helpers");

  /** jak juz skonczysz swoje to pusc dalej. */
  next();
};

/** exportujemy modul pod taka sama nazwa */

module.exports = { logger };
