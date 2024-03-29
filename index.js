require("dotenv").config();

const bot = require("./src/app");

const url = process.env.APP_URL || "https://lazytelebot001.herokuapp.com:443";
bot.launch({
  webhook: {
    domain: `${url}/bot${process.env.API_TOKEN}`,
    port: process.env.PORT,
  },
});

// start and stop the bot
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
