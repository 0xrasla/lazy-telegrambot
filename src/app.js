const { Telegraf, Markup } = require("telegraf");
const {
  onUserJoin,
  onUserLeft,
  pinMessage,
  startBot,
  banUser,
} = require("./helpers/userManagementActions");
const { sendRandomPic } = require("./helpers/additionActions");
const { settedCommands } = require("./helpers/allcommands");
const { API_TOKEN } = process.env;

const bot = new Telegraf(API_TOKEN);

bot.telegram.setMyCommands(settedCommands);

bot.start(startBot);

bot.on("new_chat_members", onUserJoin);
bot.on("left_chat_member", onUserLeft);

bot.command("rules", (ctx) => ctx.reply(commands.join("")));
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

module.exports = bot;
