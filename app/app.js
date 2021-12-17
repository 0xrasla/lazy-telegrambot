const { Telegraf } = require("telegraf");
const axios = require("axios");
const { parseApiUrl } = require("./utils");

const { HTTP_API_KEY } = process.env;

const bot = new Telegraf(HTTP_API_KEY);

bot.start((ctx) => {
  ctx.replyWithMarkdownV2(
    "**Hai i am lazybot, made by rasla💖type /help for more comments🥰"
  );
});

bot.help((ctx) => {
  ctx.reply(`
      Welcome to Lazybot! 

/kiss - send kiss gifs
/hug - send hug gifs

  `);
});

bot.on("inline_query", (ctx) => {
  console.log(ctx);
});

bot.command("kiss", async (ctx) => {
  axios.get(parseApiUrl("kiss")).then((e) => {
    const selected =
      e.data.data[Math.floor(Math.random() * e.data.data.length)];
    if (!selected.images.downsized_small.mp4) {
      ctx.reply("Welcome Pa!");
      return;
    }
    ctx.replyWithVideo(selected.images.downsized_small.mp4);
  });
});

bot.on("new_chat_members", (ctx) => {
  console.log(ctx.update.message.new_chat_members);
});

module.exports = bot;
