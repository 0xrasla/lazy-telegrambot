const { sendGif, sendGreet } = require("./_apiactions");

const startBot = (ctx) => {
  ctx.replyWithMarkdownV2(
    "**Hai i am lazybot, made by rasla💖type /help for more comments🥰"
  );
};

const onUserJoin = async (ctx) => {
  ctx.replyWithVideo(welcomeGif);

  let { first_name } = ctx?.update?.message?.new_chat_members[0] || "";
  if (!first_name) {
    exports.welcomeReply = `Hello 🙋‍♂️friend!🤗 I Heartly Welcome 💖 you to OurGroup!🥰`;
  }
  exports.welcomeReply = `Hello 🙋‍♂️ ${first_name}!🤗 I Heartly Welcome 💖 you to OurGroup!🥰`;

  ctx.reply(exports.welcomeReply);
};

const onUserLeft = async (ctx) => {
  ctx.replyWithVideo(goodByeGif);

  let { first_name } = ctx?.update?.message?.left_chat_member;

  if (!first_name) {
    exports.welcomeReply = `Hey 🙋‍♂️ Thanks friend!🤗 Good Bye and Have a good day!🥰`;
  }
  exports.welcomeReply = `Hey  🙋‍♂️ ${first_name}!🤗 Good Bye and Have a good day!🥰`;
};

const pinMessage = (ctx, bot) => {
  if (!ctx.update.message.reply_to_message) {
    ctx.reply("Hey! Specify a message to pin😂");
  }

  if (!ctx.update.message) return;
  if (!ctx.update.message.reply_to_message) return;
  if (!ctx.update.message.reply_to_message.message_id) return;

  bot.telegram
    .pinChatMessage(
      ctx.update.message.chat.id,
      ctx.update.message?.reply_to_message?.message_id
    )
    .then((e) => e && ctx.reply("Chat pinned 😋"))
    .catch((e) => {
      if (
        String(e.response.description).includes(
          "not enough rights to manage pinned messages"
        )
      ) {
        ctx.reply(
          "I have not enough access to pin the message 😁 make me admin😎😋"
        );
      }
    });
};

const banUser = (ctx, bot) => {
  if (!ctx.update.message.reply_to_message) {
    ctx.reply("Hey! plz Specify a user to ban😁");
    return;
  }
  ctx.banChatMember(ctx.update.message.reply_to_message.from.id);
  ctx.reply("user banned!😉");
};

const sendingGifs = async (ctx) => {
  let _msg = ctx.message.text.split("/gif ")[1];
  if (!_msg) {
    ctx.reply("Hey! Give a word to get some gif😂");
    return;
  }
  ctx.replyWithVideo(await sendGif(_msg));
};

const sendRandomPic = (ctx) => {
  return ctx.replyWithPhoto(
    { url: "https://picsum.photos/300/200/?random" },
    {
      caption: "Yo! a better pic for you!😁😍",
    }
  );
};

const greetWithImage = async (ctx) => {
  let _msg = ctx.message.text.split("/greet ")[1];
  if (!_msg) {
    ctx.reply("Specify what greeting you want 😚");
    return;
  }
  ctx.replyWithPhoto(await sendGreet(_msg));
};

module.exports = {
  onUserJoin,
  onUserLeft,
  pinMessage,
  startBot,
  banUser,
  sendingGifs,
  sendRandomPic,
  greetWithImage,
};
