const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
  const comment = await Comment.create({
    lesson: req.params.lessonId,
    user: req.user._id,
    text: req.body.text
  });

  res.status(201).json(comment);
};
