const express = require("express");
const { loginHandler } = require("../auth/loginHandler.js");
const router = express.Router();

router.post("/", async (req, res) => {
  // walidujemy poprawnosc danych

  const { email, password } = req.body;

  // jesli brakuje jakiejs wartosci to zwracamy wiadomosc.
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  // sprawdzamy czy login i haslo sa poprawne - stare zanim wprowadzilismy token
  //   try {
  //     const result = await loginHandler(email, password);
  //     if (result) {
  //       // tu powinnismy wyslac token
  //       return res.status(200).json({ message: "hello user" });
  //     } else {
  //       return res.status(401).json({ message: "Wrong user credentials" });
  //     }
  //   } catch (err) {
  //     return res.status(404).send(err);
  //     }

  try {
    // logujemy uzytkownika
    const token = await loginHandler(email, password);

    // jezeli logowanie poprawne to wydaj token
    return res.status(200).json({ token: token });
  } catch (err) {
    return res.status(404).send(err);
  }
});

module.exports = { loginRouter: router };
