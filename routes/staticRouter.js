const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  // Render the static HTML page
  res.render("home", {
    urls: allUrls,
  });
});

module.exports = router;
