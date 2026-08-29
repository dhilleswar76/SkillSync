const Quiz = require("../models/Quiz");

// @desc Get quiz for lesson or course
// @route GET /api/quiz/:lessonOrCourseId
const getQuiz = async (req, res) => {
  try {
    let quiz = await Quiz.findOne({ lesson: req.params.lessonOrCourseId });
    if (!quiz) {
      quiz = await Quiz.findOne({ course: req.params.lessonOrCourseId });
    }
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found" });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create quiz
// @route POST /api/quiz
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuiz,
  createQuiz,
};
