const express = require("express");
const router = express.Router();

const { handelGenetateNewShortURL } = require("../controller/url");

router.post("/", handelGenetateNewShortURL);

module.exports = router;
