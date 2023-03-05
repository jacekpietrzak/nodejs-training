const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("To glowny router");
});

router.get("/about", (req, res) => {
  res.send("About");
});

module.exports = router;
