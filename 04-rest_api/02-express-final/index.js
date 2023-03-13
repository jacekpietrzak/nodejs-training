const express = require("express");
const morgan = require("morgan");
const { routes } = require("./routes/routes.js");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(routes);

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
