const axios = require("axios");
const { GIPHY_API_KEY, BANNER_BAER_API, BANNER_BEAR_API_KEY } = process.env;

const sendGif = (q) => {
  const parseApiUrl = (s) => {
    return `${process.env.GIPHY_API}?q=${s}&limit=10&api_key=${GIPHY_API_KEY}`;
  };

  return axios.get(parseApiUrl(q)).then((e) => {
    const selected =
      e.data.data[Math.floor(Math.random() * e.data.data.length)];
    if (!selected.images.downsized_small.mp4) return "";
    else return selected.images.downsized_small.mp4;
  });
};

const sendGreet = async (q) => {
  const body = {
    template: "1eGqK9b3M3w5naYpP8",
    modifications: [
      {
        name: "message",
        text: q,
        color: null,
        background: null,
      },
      {
        name: "face",
        image_url:
          "https://cdn.bannerbear.com/sample_images/welcome_bear_photo.jpg",
      },
    ],
    webhook_url: null,
    transparent: false,
    metadata: null,
  };

  let data = await axios.post(BANNER_BAER_API, body, {
    headers: {
      Authorization: "Bearer " + BANNER_BEAR_API_KEY,
    },
  });

  if (data.data?.status == "completed") {
    return data.data.image_url_png;
  }
};

module.exports = {
  sendGif,
  sendGreet,
};
