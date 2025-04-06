const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenetateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({
      message: "URL is required",
    });
  }
  const shortId = shortid();


  await URL.create({
    shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home",{
    id:shortId
  });
}

module.exports = {
  handelGenetateNewShortURL,
};
