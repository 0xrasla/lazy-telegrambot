const express = require("express");
require("dotenv").config();
const app = express();

const bot = require("./src/app");

app.get("/", (req, res) => {
  bot.launch();
  console.log("dd");
  res.json({ ok: true, message: "Bot Running" });
});

app.listen(3000, () => {
  console.log("App running in port 3000");
});

module.exports = app;
