require("dotenv").config();

const bot = require("./src/app");

const url =
  process.env.APP_URL || "https://lazybotmakemegobr.herokuapp.com:443";
bot.launch({
  webhook: {
    domain: `${url}/bot${process.env.API_TOKEN}`,
    port: process.env.PORT,
  },
});

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
