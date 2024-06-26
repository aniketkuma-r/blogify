const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const handleCreateNewBlog = async (req, res) => {
  const { title, description, body } = req.body;
  const blog = await Blog.create({
    title,
    description,
    body,
    createdBy: req.user._id,
    coverImageUrl: req.file ? `/uploads/${req.file.filename}` : null,
  });

  return res.redirect(`/blog/${blog._id}`);
};
const handleCreateComment = async (req, res) => {
  const { content } = req.body;
  const blogId = req.params.id;

  await Comment.create({
    content,
    blogId,
    createdBy:req.user._id,
  })
  return res.redirect(`/blog/${blogId}`);
};

module.exports = {
  handleCreateNewBlog,
  handleCreateComment
};
