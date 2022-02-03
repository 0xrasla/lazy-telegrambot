require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.API_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));

const url =
  process.env.APP_URL || "https://lazybotmakemegobr.herokuapp.com:443";

bot.launch({
  webhook: {
    domain: `${url}/bot${process.env.API_TOKEN}`,
    port: process.env.PORT,
  },
});
console.log("Bot launched...");

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
