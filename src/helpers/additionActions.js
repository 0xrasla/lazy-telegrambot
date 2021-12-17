const sendRandomPic = (ctx) => {
  return ctx.replyWithPhoto(
    { url: "https://picsum.photos/300/200/?random" },
    {
      caption: "Yo! a better pic for you!😁😍",
    }
  );
};

module.exports = {
  sendRandomPic,
};
