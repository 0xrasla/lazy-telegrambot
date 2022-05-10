const { Telegraf, Markup } = require("telegraf");
const {
  onUserJoin,
  onUserLeft,
  pinMessage,
  startBot,
  banUser,
  sendingGifs,
  sendRandomPic,
  greetWithImage,
  sendRules,
  sendHelp,
  getCurrentTimeQuote,
  getGithubDetails,
  getRandomFood,
} = require("./actions/_useractions");
const { settedCommands } = require("./actions/_botcommands");
const { API_TOKEN } = process.env;

const bot = new Telegraf(API_TOKEN);

bot.telegram.setMyCommands(settedCommands);

bot.start(startBot);
bot.on("new_chat_members", onUserJoin);
bot.on("left_chat_member", onUserLeft);

bot.command("rules", (ctx) => sendRules(ctx));
bot.command("help", (ctx) => sendHelp(ctx));

bot.command("chatid", (ctx) =>
  ctx.reply(
    ctx.update.message.reply_to_message
      ? ctx.update.message.chat.id
      : "Hey Bro! 😂Specify a chat to get chatid"
  )
);
bot.command("pin", (e) => pinMessage(e, bot));
bot.command("ban", banUser);

bot.command("randompic", sendRandomPic);
bot.command("gif", async (ctx) => sendingGifs(ctx));
bot.command("greet", async (ctx) => greetWithImage(ctx));
bot.command("time", async (ctx) => getCurrentTimeQuote(ctx));
bot.command("git", async (ctx) => getGithubDetails(ctx));
bot.command("food", async (ctx) => getRandomFood(ctx));

module.exports = bot;
