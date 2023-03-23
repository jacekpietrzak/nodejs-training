const express = require("express");

// importujemy zmienne srodowiskowe
require("dotenv").config({ path: "./.env" });

// const cors = require("cors");
const morgan = require("morgan");

// importujemy glowny router
const { routes } = require("./routes/routes.js");

// laczymy sie z baza danych mongo
const { connectDataBase } = require("./startup/database.js");
connectDataBase();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
app.use(routes);

// console.log("enviro:", process.env);
// console.log("Operating system:", process.env.OS);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
