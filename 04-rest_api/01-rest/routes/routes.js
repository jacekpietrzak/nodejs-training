/** to jest plik gdzie bedziemy miec wszystkie routey
 * Nasz router jest tez niczym innym jak funkcja middleware ktora przyjmuje zapytania i rozdziela na rozne routingi
 */

const express = require("express");
/** importujemy route kazdej logiki ktora stworzylismy */
const { lessonsRouter } = require("./lessons.js");
const { usersRouter } = require("./users.js");

const router = express.Router();

/** dodajemy linijke ktora mowi ze wszystkie zapytania ktore przychodza na dany adres mamy kierowac na odpowiedni router. W lessonsRouter mamy obsluge*/
router.use("/lessons", lessonsRouter);
router.use("/users", usersRouter);

module.exports = { router };
