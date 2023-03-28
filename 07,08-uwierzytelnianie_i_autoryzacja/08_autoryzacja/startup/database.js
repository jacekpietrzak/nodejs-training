// require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");

// dobra praktyka jest trzymac to w zmiennych srodowiskowych.
const DBPATH = process.env.DB_SECRET;

if (!DBPATH) {
  console.error("No db secret provided");
}

const connectDataBase = async () => {
  await mongoose
    .connect(DBPATH)
    .then(() => {
      console.log("Connected to mongo db");
    })
    .catch((error) => console.log("Error with connect to db", error));
};

module.exports = { connectDataBase };
