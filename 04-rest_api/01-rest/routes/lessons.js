const express = require("express");

/** importujemy nasz middleware */
const { logger } = require("../helpers/logger.js");

const router = express.Router();

// pobierz
/** adresy sa "/" poniwaz juz w routes.js powiedzielismy ze zapytania przychodzace na /lessons maja isc tutaj. Wiec tutaj juz nie potrzebujemy adersu bo bysmy go powtorzyli i adres wygladalby /lessons/lessons */
router.get("/", logger, (req, res) => {
  const query = req.query;
  console.log("query:", query);
  const response = {
    topic: "Node.js + express",
    day: "czwartek",
  };
  res.json(response);
});

// pobierz po id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  console.log("id lekcji:", id);

  const response = {
    topic: `Node.js + express ${id}`,
  };
  res.json(response);
});

// dodaj
router.post("/", (req, res) => {
  console.log("req body:", req.body);
  res.json({
    info: "lesson",
  });
});

// exportujemy modul lesson i aliasujemy ze nasz router to lessonRouter
module.exports = { lessonsRouter: router };
