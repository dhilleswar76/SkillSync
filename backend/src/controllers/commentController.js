const Comment = require("../models/Comment");

// @desc Get comments for a lesson
// @route GET /api/comments/lesson/:lessonId
const getLessonComments = async (req, res) => {
  try {
    const comments = await Comment.find({ lesson: req.params.lessonId })
      .populate("user", "name avatar role")
      .sort("-createdAt");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add comment to a lesson
// @route POST /api/comments
const addComment = async (req, res) => {
  try {
    const { lessonId, content } = req.body;
    if (!content || !lessonId) {
      return res.status(400).json({ message: "Content and lessonId are required" });
    }

    const comment = await Comment.create({
      lesson: lessonId,
      user: req.user._id,
      content,
    });

    const populated = await Comment.findById(comment._id).populate("user", "name avatar role");
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLessonComments,
  addComment,
};
