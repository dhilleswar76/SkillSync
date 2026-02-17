const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const course = await Course.create(req.body);
  res.status(201).json(course);
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate("lessons");
  res.json(courses);
};

exports.enrollCourse = async (req, res) => {
  if (!req.user.enrolledCourses.includes(req.params.courseId)) {
    req.user.enrolledCourses.push(req.params.courseId);
    await req.user.save();
  }
  res.json({ message: "Enrolled successfully" });
};
