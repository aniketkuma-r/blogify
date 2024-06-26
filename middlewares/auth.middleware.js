const { validateToken } = require("../services/auth.service");

const checkForAuthenticationCookie = (cookie) => {
  return (req, res, next) => {
    req.user = null;
    const cookieValue = req.cookies[cookie];
    if (!cookieValue) return next();

    const userPayload = validateToken(cookieValue);
    req.user = userPayload;
    return next();
  };
};

module.exports = {
  checkForAuthenticationCookie,
};
