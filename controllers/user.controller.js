const User = require("../models/user.model");
const { createTokenForUser } = require("../services/auth.service");

const handleUserSignUp = async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res.render("signup", {
      error: "Confirm Password do not match !!",
    });
  const user = await User.findOne({ email });

  if (user)
    return res.render("signup", {
      error: "Account with this email already exists.",
    });

  await User.create({
    fullName,
    email,
    password,
  });
  return res.render("signup", {
    success: "Account Created Successfully.",
  });
};

const handleUserSignIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.matchPassword(email, password);
    const token = createTokenForUser(user);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("signin", { error });
  }
};
const handleUserSignOut = async (req, res) => res.clearCookie("token").redirect("/");

module.exports = {
  handleUserSignUp,
  handleUserSignIn,
  handleUserSignOut,
};
