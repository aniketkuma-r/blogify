const { Router } = require("express");
const User = require("../models/user.model");

const router = Router();

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  res.render("profile", { user });
});

module.exports = router;
