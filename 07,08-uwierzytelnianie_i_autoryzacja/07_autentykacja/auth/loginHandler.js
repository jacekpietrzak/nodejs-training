const bcrypt = require("bcrypt");

const { getUserByEmail } = require("../controllers/users.js");
const { issueToken } = require("./issueToken.js");

const loginHandler = async (email, incomingPassword) => {
  // pobieramy uzytkownika. Nie znamy id wiec musimy to zrobic by email.

  const user = await getUserByEmail(email);

  // jezeli nie ma uzytkownika to zwroc informacje ze go nie ma
  if (!user) {
    throw { code: 404, msg: "User not found" };
  }

  // wziac haslo uzytkownika
  const userPassword = user.password;

  // porownac hasla, przychodzace (incomingPassword z parametrow) wyslane z API i uzytkownika zapisane w bazie danych
  // bcrypt.compareSync zwraca true albo false
  const result = bcrypt.compareSync(incomingPassword, userPassword);

  // zwracamy wynik porownania - jak juz mamy token to zwracamy token zamiast wynik porownania.
  //   return result;

  // zwracamy token
  if (result) {
    return issueToken(user);
  } else {
    throw { code: 401, msg: "Invalid credentials" };
  }
};

module.exports = { loginHandler };
