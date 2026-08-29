const Progress = require("../models/Progress");
const Course = require("../models/Course");
const Certificate = require("../models/Certificate");

// @desc Get user progress across all courses
// @route GET /api/progress
const getAllUserProgress = async (req, res) => {
  try {
    const progressList = await Progress.find({ user: req.user._id }).populate("course");
    res.json(progressList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get progress for specific course
// @route GET /api/progress/:courseId
const getCourseProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({
      user: req.user._id,
      course: req.params.courseId,
    }).populate("course");

    if (!progress) {
      return res.json({
        user: req.user._id,
        course: req.params.courseId,
        completedLessons: [],
        completedTopics: [],
        quizScores: [],
        percentage: 0,
        totalPoints: 0,
        isCompleted: false,
      });
    }

    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update progress (mark topic complete / submit quiz)
// @route POST /api/progress/:courseId
const updateProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { completedTopic, completedLesson, quizResult } = req.body;

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        course: courseId,
        completedLessons: [],
        completedTopics: [],
        quizScores: [],
        percentage: 0,
        totalPoints: 0,
      });
    }

    if (completedTopic && !progress.completedTopics.includes(completedTopic)) {
      progress.completedTopics.push(completedTopic);
    }

    if (completedLesson && !progress.completedLessons.includes(completedLesson)) {
      progress.completedLessons.push(completedLesson);
    }

    if (quizResult) {
      const existingQuizIdx = progress.quizScores.findIndex(
        (q) => q.moduleIndex === quizResult.moduleIndex
      );
      if (existingQuizIdx > -1) {
        progress.quizScores[existingQuizIdx] = quizResult;
      } else {
        progress.quizScores.push(quizResult);
      }
    }

    // Calculate percentage based on course
    const course = await Course.findById(courseId);
    if (course && course.modules && course.modules.length > 0) {
      let totalTopicsCount = 0;
      course.modules.forEach((m) => {
        totalTopicsCount += m.topics ? m.topics.length : 0;
      });

      if (totalTopicsCount > 0) {
        progress.percentage = Math.min(
          100,
          Math.round((progress.completedTopics.length / totalTopicsCount) * 100)
        );
      }

      if (progress.percentage >= 100 && !progress.isCompleted) {
        progress.isCompleted = true;
        progress.completedAt = new Date();

        // Auto-generate certificate if not exists
        const certExists = await Certificate.findOne({ user: req.user._id, course: courseId });
        if (!certExists) {
          await Certificate.create({
            certificateId: `CERT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
            user: req.user._id,
            course: courseId,
            grade: "A+",
            score: 95,
          });
        }
      }
    }

    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUserProgress,
  getCourseProgress,
  updateProgress,
};
