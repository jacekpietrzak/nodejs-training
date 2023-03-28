// tworzymy funkcje middleware do obslugi autoryzacji czy uzytkownik moze pobrac liste uzytkownikow

// importujemy biblioteke JWT
const jwt = require("jsonwebtoken");

// importujemy kontroler do sprawdzenia usera po id jako dodatkowa weryfikacje dla tokena.
const { getUserById } = require("../controllers/users.js");

// pobieramy secret z .env
const jwtSecret = process.env.JWT_SECRET;

// napiszemy funkcje ktora owrappuje nasza metode auth ktory bedzie przydzielal typ uzytkownikow dynamicznie

const auth = (...allowedRoles) => {
  // piszemy funkcje middleware
  return async (req, res, next) => {
    // pobieramy token z naglowka
    const token = req.headers.authorization;

    console.log("allowed roles: ", allowedRoles);

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

      // sprawdzamy role uzytkownika
      const { role } = user;
      console.log("role", role);

      // sprawdzamy czy rola jest w tablicy allowed roles
      const isAllowed = allowedRoles.includes(role);
      console.log("isAllowed:", isAllowed);

      // sprawdzamy czy user istnieje
      if (user) {
        // sprawdzamy czy user ma dostep do danego zasobu
        if (isAllowed) {
          // jesli wszystko ok to puszczamy dalej
          next();
        } else {
          // w momencie gdy user istnieje ale nie ma dostepu do zasobu to 403
          return res
            .status(403)
            .json({ message: "You don't have permission to this resource" });
        }
      } else {
        // w momencie gdy user nie istneije w systemie to 401
        return res.status(401).json({ message: "Access denied" });
      }
    } catch (error) {
      console.log("error", error);
      // jesli pojdzie nie tak to odmawiamy dostepu
      return res.status(error.code).json({ message: "Access denied" });
    }
  };
};

//eksportujemy modul
module.exports = { auth };
