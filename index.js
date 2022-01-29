const express = require("express");
require("dotenv").config();
const app = express();

const bot = require("./src/app");

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Bot Running" });
});

bot.launch();
module.exports = app;
