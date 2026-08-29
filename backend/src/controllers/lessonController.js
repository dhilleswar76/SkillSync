const Lesson = require("../models/Lesson");
const Quiz = require("../models/Quiz");

// @desc Get lesson by ID
// @route GET /api/lessons/:id
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("course");
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    const quiz = await Quiz.findOne({ lesson: lesson._id });
    res.json({ ...lesson.toObject(), quiz });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create lesson
// @route POST /api/lessons
const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create(req.body);
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update lesson
// @route PUT /api/lessons/:id
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete lesson
// @route DELETE /api/lessons/:id
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    await Quiz.deleteMany({ lesson: req.params.id });
    res.json({ message: "Lesson deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
