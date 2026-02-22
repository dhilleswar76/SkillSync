const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

exports.createLesson = async (req, res) => {
  const lesson = await Lesson.create(req.body);

  await Course.findByIdAndUpdate(req.body.course, {
    $push: { lessons: lesson._id }
  });

  res.status(201).json(lesson);
};
