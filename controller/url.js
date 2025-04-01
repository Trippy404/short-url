const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenetateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      message: "URL is required",
    });
  }
  const shortId = shortid(8);
  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortId });
}

module.exports = {
  handelGenetateNewShortURL,
};
