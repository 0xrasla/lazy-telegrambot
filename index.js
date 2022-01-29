const express = require("express");

require("dotenv").config();
const app = express();

const express = require("express");
const bot = require("./src/app");

app.get("/", (req, res) => {
  bot.launch();
  console.log("dd");
  res.json({ ok: true, message: "Bot Running" });
});

module.exports = app;
