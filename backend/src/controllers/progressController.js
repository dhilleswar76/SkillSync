const Progress = require("../models/Progress");

exports.markComplete = async (req, res) => {
  const { courseId, lessonId } = req.body;

  if (!courseId || !lessonId) {
    return res.status(400).json({ message: "courseId and lessonId are required" });
  }

  let progress = await Progress.findOne({
    student: req.user._id,
    course: courseId
  });

  if (!progress) {
    progress = await Progress.create({
      student: req.user._id,
      course: courseId,
      completedLessons: [lessonId]
    });
  } else {
    if (!progress.completedLessons.includes(lessonId)) {
      progress.completedLessons.push(lessonId);
    }
  }

  await progress.save();
  res.json(progress);
};
