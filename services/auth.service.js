require("dotenv").config();
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
};
const validateToken = (token) => {
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return null;
  }
};

module.exports = {
  createTokenForUser,
  validateToken,
};
