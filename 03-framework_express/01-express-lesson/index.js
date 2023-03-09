const express = require("express");
const app = express();

/** middleware to funkcja ktora wykonuje sie pomiedzy innymi funkcjami
 * middleware wykonuje sie miedzy funkcjami i bedzie tez znala request i response i do tego 3 argument next.
 * czesto middleware function jest uzywane np do otrzymania danych z jakiego urzadzenia sie logujemy do aplikacji. Ze zanim jeszcze nasz request przyjdzie do handlera danego requestu to przechodzi przez tego middleware.
 * jesli w middleware nie uzyjemy metody next to wpadniemy w nieskonczona petle bo aplikacja zatrzyma sie na funkcji middleware. Next powoduje ze aplikacja wykonuje sie dalej.
 */
/** Middleware */
/** w ten sposob definiujemy middleware globalnie dla kazdego przychodzacego requestu*/
app.use((req, res, next) => {
  /** wykonaj logike np
   * autentykacja uzytkownika, autoryzacja
   */

  /** wylogujemy sobie dla przykladu metode post */
  //   console.log(req);

  /** jak juz skonczysz swoje to pusc dalej. */

  console.log("przychodzacy request");
  next();
});

/** mozemy tez middleware przypozadkowac jakiejs zmiennej bo np nie chcemy aby sie wykonywalo za kazdym razem i odniesc sie do niego w danej metodzie get, post, put, delete jako 2 argument  */
const middleware = (req, res, next) => {
  console.log("przychodzacy request z middleware ze zmiennej");
  /** wykonaj logike np
   * autentykacja uzytkownika, autoryzacja
   */

  /** wylogujemy sobie parametry dla metody get z parametrami */
  //   console.log(req.params);

  /** jak juz skonczysz swoje to pusc dalej. */

  next();
};

/** stworzymy teraz interfejs przez ktory bedziemy mogli sie dostac do naszego programu z zewnatrz.
 * get jest do zapytan z zewnatrz - pobieranie danych. get('path', (callback function ktra obsluguje zapytanie)).
 * Callback przyjmuje 2 argumenty (request, response).
 ** req - wszystko co przychodzi
 ** res - to co od nas wyjdzie
 */

/** Podstawowe zagadnienia. Jak tabliczka mnozenia. Must have. Trzeba wiedziec czym sa te 4 metody:
 * GET - Pobieramy dane
 * POST - Wkladamy, tworzymy dane
 * PUT - Uaktualniamy dane
 * DELETE - Usuwamy dane
 */

/** express nie jest stworzony do budowania frontendu ale mozna to zrobic. Na tym polega renderowanie reacta po stronie serweru. Mozna to zrobic poprzez owiniecie reacta expressem w metodzie res.send(caly obiekt reaktowy tutaj)
 * my tutaj nie bedziemy tego robic. Skupimy sie na backendzie. W tym sposobie uzywamy rozwiazania ze frontend komunikuje sie z backendem za pomoca wysylania zapytan get, post, put i delete wysylajac miedzy soba pliki z danymi w postaci obiekty typu .json. Ktore wygladaja np jak package.json
 * Jesli wylogujemy req ale nie damy zednego res to w przegladarce na danym porcie strona bedzie nam sie ladowac w nieskonczonosc gdyz nie dostala odpowiedzi.
 * w res najlepie wyslac rowniez dane w formie .json
 */

app.get("/", middleware, (req, res) => {
  // console.log("req", req);
  console.log("res", res);
  //   res.send("Siema!!");
  const response = {
    topic: "Node.js + express",
    day: "czwartek",
  };

  res.json(response);
});

app.post("/", (req, res) => {
  const post = {
    topic: "Node.js + express",
    day: "czwartek",
  };

  res.json(post);
});

/** Parametry */
/*
 * powiedzmy ze chcemy dostac dane odnosnie lekcji. Stworzymy metode get z adresem "/lessons"
 * nasze lessons maja jakies id. Mowimy expressowi ze w tym zapytaniu moze jeszcze przyjsc jakis parametr ktory moze byc dynamiczny. W adresie to co po ":" jest dynamiczne app.get("/lessons/:parametr")
 * :parametr - w adresie definiujemy klucz obiektu naszej zmiennej.
 * uzyjemy naszego middleware aby zalogowac req
 * aby wylogowac parametr uzywamy req.params
 */

/** wysylamy info o lekcjach */
/** przegladarka juz tej metody nie wywolamy gdyz przegladarka robi metody get(chyba ze juz kod aplikacji robi cos innego)
 * jesli uzyjemy postmana i zrobimy post na adres localhost:3000/lessons/ to otrzymamy obiekt danych {"info": "lesson"}
 */

/** Body */
/** Aby wyslac expressowi body to musimy mu powiedziec w jaki sposob chcemy z nim rozmawiac. To okreslimy na samym poczatku przy wywolaniu w argumencie funkcji express w zmiennej app podamy jakiego rodzaju requesty beda do niego przychodzic. Uzywamy do tego funkcji middleware.
 * app.use(express.urlencoded({ extended: false }));
 * albo app.use(express.json());
 */
app.use(express.urlencoded({ extended: false }));

app.post("/lessons", (req, res) => {
  console.log("req body:", req.body);
  res.json({
    info: "lesson",
  });
});

/** Parametry i Query */
/** jesli napiszemy ponizej kolejna metode post na ten sam adres to on sie nigdy nie wykona poniewaz on leci sobie od gory i sprawdza gdzie jest ta metoda i zwroci pierwsza ktora napotka.
 * Jesli chodzi o np get z ta sama sciezka ale np dodamy parametr do adresu to juz bedzie traktowane jako inna metoda.
 * Dobrze budowac sobie routing zaczynajac od metod ktore dostaja najwieksza ilosc parametrow po te ktore dostaja najmniejsza ilosc parametrow.
 * jesli chcemy urzywac wiekszej ilosci parametrow to wtedy uzywamy operatora logicznego && i to juz nie nazywamy parametrami a query np.: (lossons?skip=0&limit=10)
 * parametr jest tylko jeden, gdy jest ich wiecej to juz jest jako query i do query dostajemy sie za pomoca req.query
 */

/** pobieramy info o lekcjach */

app.get("/lessons", (req, res) => {
  const query = req.query;
  console.log(query);
  const response = {
    topic: "Node.js + express",
    day: "czwartek",
  };
  res.json(response);
});

app.get("/lessons/:id", middleware, (req, res) => {
  const { id } = req.params;

  console.log("id lekcji:", id);

  const response = {
    topic: "Node.js + express",
    day: "czwartek",
  };
  res.json(response);
});

/** abysmy mogli sie dostac do naszej aplikacji, musi ona sluchac. Aby mogla sluchac musimy uzyc app.listen(port, callback).
 * port - to port na ktorym slucha na danej maszynie, serwer czy lokalny komputer.
 * callback - funkcja ktora wykona sie tylko raz kiedy aplikacja zacznie sluchac. Zazwyczaj wpisuje sie informacje ze "server listens on port "
 * Gdy uzyjemy metody listen to ta aplikacja bedzie caly czas sluchac. Jesli jej nie uzyjemy to wykona sie kod i aplikacja sie zakonczy.
 */

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});
