const { sendGif, sendGreet } = require("./_apiactions");
const axios = require("axios");

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

const sendRules = (ctx) => {
  ctx.replyWithMarkdownV2(
    "*Rules*\n\n1 No Spamming\n2 No Advertising\n3 No Harassment\n4 No Racist/Sexist/"
  );
};

const sendHelp = (ctx) => {
  ctx.replyWithMarkdownV2(
    "*/help*\n\n1 /rules\n2 /chatid\n3 /pin\n4 /ban\n5 /randompic\n6 /gif\n7 /greet\n8 /git\n9 /time\n10 /food"
  );
};

const getCurrentTimeQuote = async (ctx) => {
  let curDate = new Date()
    .toLocaleTimeString("en-US", {
      hour12: false,
    })
    .split(":");

  let timeQuote = await axios
    .get(
      `https://raw.githubusercontent.com/lbngoc/literature-clock/master/docs/times/${curDate[0]}:${curDate[1]}.json`
    )
    .then((res) => res.data);

  ctx.replyWithMarkdownV2(
    `*Current Time*\n\n${new Date().toLocaleString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })}`
  );
  ctx.reply(
    timeQuote[0].quote_first.trim() + "\n" + timeQuote[0].quote_last.trim()
  );
};

const getGithubDetails = async (ctx) => {
  let _msg = ctx.message.text.split("/git ")[1];
  if (!_msg) {
    ctx.reply("Specify a username 😚");
    return;
  }
  let gitHubUser = await axios
    .get(`https://api.github.com/users/${_msg}`)
    .then((res) => res.data);

  console.log(gitHubUser);
  ctx.replyWithPhoto(gitHubUser.avatar_url);
  ctx.reply(
    `*Github Details*\n\nUsername: ${gitHubUser.login}\n\nBio: ${gitHubUser.bio}\n\nFollowers: ${gitHubUser.followers}\n\nFollowing: ${gitHubUser.following}\n\nPublic Repos: ${gitHubUser.public_repos} \n\nPublic Gists: ${gitHubUser.public_gists} \n\nClick here to visit ${gitHubUser.html_url}`
  );
};

const getRandomFood = async (ctx) => {
  let _msg = ctx.message.text.split("/food ")[1];
  if (!_msg) {
    ctx.reply("Specify a food 😚");
    return;
  }
  let food = await axios
    .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${_msg}`)
    .then((res) => res.data);
  if (!food.meals) {
    ctx.reply("No food found 😞");
    return;
  }
  ctx.replyWithPhoto(food.meals[0].strMealThumb);
  ctx.reply(
    `*Food Details*\n\nName: ${food.meals[0].strMeal}\n\nCategory: ${food.meals[0].strCategory}\n\nArea: ${food.meals[0].strArea}\n\nInstructions: ${food.meals[0].strInstructions}`
  );
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
  sendRules,
  sendHelp,
  getCurrentTimeQuote,
  getGithubDetails,
  getRandomFood,
};
