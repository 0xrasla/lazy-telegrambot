const { GIPHY_API_KEY } = process.env;

exports.parseApiUrl = (q) => {
  return `${process.env.GIPHY_API}?q=${q}&limit=50&api_key=${GIPHY_API_KEY}`;
};
