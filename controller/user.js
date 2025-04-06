const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handelUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function handelUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "User not found",
    });

  
  const token =setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handelUserSignup,
  handelUserLogin,
};
