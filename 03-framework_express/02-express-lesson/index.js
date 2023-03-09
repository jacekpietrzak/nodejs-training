/** dobra praktyka jest aby ten plik przechowywal tylko najwazniejsze informacje. */

/** importujemy express */
const express = require("express");

/** importujemy nasz glowny router */
const { router } = require("./routes/routes.js");

/** inicjujemy apke express-owa */
const app = express();

/** ustalamy jakiego rodzaju dane beda wysylane poprzez middleware. Tutaj uzywamy middleware ktory nam rozkodowuje informacje ktore sa w body dla requestu */
app.use(express.urlencoded({ extended: false }));
/** jesli chcemy sluchac json i dekodowac json to uzyejmy: */
app.use(express.json());
/** w globalnych middleware tez mozemy robic zalozenia jak np:
 * jesli plik jest wiekszy niz 10mb to odrzuc
 * jesli plik ma rozszerzenie .exe bo jakis troll chce nam wrzucic wirusa to odrzuc.
 */

/** mowimy aby express uzywal naszego glownego routera z routes.js.
 * Nasz router jest tez niczym innym jak funkcja middleware ktora przyjmuje zapytania i rozdziela na rozne routingi
 */
app.use(router);

/** ustalamy port do sluchania */
const port = 3000;

/** wywolujemy metode sluchajaca */
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
