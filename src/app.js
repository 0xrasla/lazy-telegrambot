const { Telegraf } = require("telegraf");
const {
  onUserJoin,
  onUserLeft,
  pinMessage,
  startBot,
} = require("./helpers/userManagementActions");
const { commands } = require("./helpers/allcommands");
const { sendGif } = require("./helpers/utils");
const { HTTP_API_KEY } = process.env;

const bot = new Telegraf(HTTP_API_KEY);

bot.start(startBot);
bot.help((ctx) => ctx.reply(commands.join("")));

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

module.exports = bot;
