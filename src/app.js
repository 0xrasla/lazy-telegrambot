const { Telegraf } = require("telegraf");
const { gifs, onUserJoin, onUserLeft } = require("./helpers/basicUserFns");
const { commands } = require("./helpers/allcommands");

const { HTTP_API_KEY } = process.env;

const bot = new Telegraf(HTTP_API_KEY);

bot.start((ctx) => {
  ctx.replyWithMarkdownV2(
    "**Hai i am lazybot, made by rasla💖type /help for more comments🥰"
  );
});

bot.help((ctx) => {
  ctx.reply(commands.join(""));
});

bot.command("kiss", gifs);

bot.on("new_chat_members", onUserJoin);
bot.on("left_chat_member", onUserLeft);

module.exports = bot;
