const { sendGif } = require("./utils");

// functionality

const gifs = async (ctx) => {
  let reply = await sendGif("kiss");
  if (!reply) return;
  ctx.replyWithVideo(reply);
};

// user join and left

const onUserJoin = async (ctx) => {
  let welcomeGif = await sendGif("welcome");
  ctx.replyWithVideo(welcomeGif);

  let { first_name } = ctx?.update?.message?.new_chat_members[0] || "";
  if (!first_name) {
    exports.welcomeReply = `Hello 💇‍♂️ friend!🤗 I Heartly Welcome 💖 you to OurGroup!🥰`;
  }
  exports.welcomeReply = `Hello 💇‍♂️ ${first_name}!🤗 I Heartly Welcome 💖 you to OurGroup!🥰`;

  ctx.reply(exports.welcomeReply);
};

const onUserLeft = async (ctx) => {
  let goodByeGif = await sendGif("good bye");
  ctx.replyWithVideo(goodByeGif);

  let { first_name } = ctx?.update?.message?.left_chat_member;

  if (!first_name) {
    exports.welcomeReply = `Hey 🙋‍♂️ Thanks friend!🤗 Good Bye and Have a good day!🥰`;
  }
  exports.welcomeReply = `Hey  🙋‍♂️ ${first_name}!🤗 Good Bye and Have a good day!🥰`;
};

module.exports = {
  gifs,
  onUserJoin,
  onUserLeft,
};
