const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const options = {
  webHook: {
    port: process.env.PORT,
  },
};

const url = process.env.APP_URL || "https://<app-name>.herokuapp.com:443";

const bot = new TelegramBot(process.env.API_TOKEN, options);

bot.setWebHook(`${url}/bot${process.env.API_TOKEN}`);

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Received your message");
});
