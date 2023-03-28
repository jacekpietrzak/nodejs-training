// tworzymy funkcje middleware do obslugi autoryzacji czy uzytkownik moze pobrac liste uzytkownikow

// importujemy biblioteke JWT
const jwt = require("jsonwebtoken");

// importujemy kontroler do sprawdzenia usera po id jako dodatkowa weryfikacje dla tokena.
const { getUserById } = require("../controllers/users.js");

// pobieramy secret z .env
const jwtSecret = process.env.JWT_SECRET;

// piszemy funkcje middleware
const auth = async (req, res, next) => {
  // pobieramy token z naglowka
  const token = req.headers.authorization;
  console.log("token", token);

  // jesli uzytkownik nie wyslal tokena to nie puszczamy dalej
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // jesli token jest to go weryfikujemy
  try {
    // my tylko sprawdzamy token. np uzytkownik zarejestrowal sie, zalogowal, dostal token i cos narozrabial. Admin usunal jego konto ale ten uzytkownik byl cwany i skopiowal sobie token. Dzieki temu tokenowi moze dalej wysylac zapytania do serwera poniewaz my nie weryfikujemy nic wiecej jak tylko token. Mamy ogromna dziure bezpieczenstwa w systemie. aby tego uniknac to po weryfikacji tokenu nalezy sprawdzic czy uzytkownik istenije w bazie.

    const decodedToken = await jwt.verify(token, jwtSecret);
    const { id } = decodedToken;

    // po weryfikacji tokenu sprawdzamy czy uzytkownik istnieje w bazie/systemie.

    const user = await getUserById(id);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }

    // jesli wszystko sie udalo to wolamy funkcje next() aby zapytanie poszlo dalej.
    next();
  } catch (error) {
    console.log("error", error);
    // jesli pojdzie nie tak to odmawiamy dostepu
    return res.status(error.code).json({ message: "Access denied" });
  }
};

//eksportujemy modul
module.exports = { auth };
