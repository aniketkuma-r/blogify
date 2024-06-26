const { Router } = require("express");
const upload = require("../services/upload.service");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const {
  handleCreateNewBlog,
  handleCreateComment,
} = require("../controllers/blog.controller");

const router = Router();

router.get("/addnew", (req, res) => {
  res.render("addblog", {
    user: req.user,
  });
});
router.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId).populate("createdBy");
  const comments = await Comment.find({ blogId }).populate("createdBy");
  res.render("blog", { user: req.user, blog, comments });
});

router.post("/addnew", upload.single("coverImageUrl"), handleCreateNewBlog);
router.post("/comment/:id", handleCreateComment);

module.exports = router;
