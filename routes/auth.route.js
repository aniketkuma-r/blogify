const { Router } = require("express");
const { handleUserSignUp, handleUserSignIn, handleUserSignOut } = require("../controllers/user.controller");

const router = Router();

router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", handleUserSignUp);
router.post("/signin", handleUserSignIn);
router.get("/signout", handleUserSignOut);

module.exports = router;
