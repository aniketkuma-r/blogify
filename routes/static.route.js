const { Router } = require("express");
const Blog = require("../models/blog.model");

const router = Router();

router.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home",{
    user:req.user,
    blogs: allBlogs,
  });
});

module.exports = router;
