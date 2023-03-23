const { Sequelize } = require("sequelize");

const sequelize = new Sequelize();

// dobra praktyka jest trzymac to w zmiennych srodowiskowych.
const SQLDB_SECRET = process.env.SQLDB_SECRET;

if (!SQLDB_SECRET) {
  console.error("No db secret provided");
}

const connectDataBase = async () => {
  await mongoose
    .connect(SQLDB_SECRET)
    .then(() => {
      console.log("Connected to mongo db");
    })
    .catch((error) => console.log("Error with connect to db", error));
};

module.exports = { connectDataBase };
