const axios = require("axios");
const { GIPHY_API_KEY } = process.env;

const sendGif = (q) => {
  const parseApiUrl = (s) => {
    return `${process.env.GIPHY_API}?q=${s}&limit=50&api_key=${GIPHY_API_KEY}`;
  };

  return axios.get(parseApiUrl(q)).then((e) => {
    const selected =
      e.data.data[Math.floor(Math.random() * e.data.data.length)];
    if (!selected.images.downsized_small.mp4) return "";
    else return selected.images.downsized_small.mp4;
  });
};

module.exports = {
  sendGif,
};
