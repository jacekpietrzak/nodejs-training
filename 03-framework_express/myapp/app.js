const express = require("express");
const app = express();
const myRouter = require("./my-router");

app.use("/my-router", myRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use((req, res, next) => {
  console.log("Nasze oprogramowanie posredniczace");
  next();
});

app.get("/contact", (req, res) => {
  res.send("<h1>Hey in contact</h1>");
});

app.get("/contact/:id", (req, res) => {
  res.send(`<h1>Contact</h1> Param: ${req.params.id} `);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
