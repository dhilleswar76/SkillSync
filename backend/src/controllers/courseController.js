const Course = require("../models/Course");
const Lesson = require("../models/Lesson");

// @desc Get all courses
// @route GET /api/courses
const getCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = { isPublished: true };

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const courses = await Course.find(filter).populate("instructor", "name avatar");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get course by ID
// @route GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name avatar bio");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const lessons = await Lesson.find({ course: course._id }).sort("order");
    res.json({ ...course.toObject(), lessons });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create course (Admin)
// @route POST /api/courses
const createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update course (Admin)
// @route PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete course (Admin)
// @route DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Lesson.deleteMany({ course: req.params.id });
    res.json({ message: "Course and associated lessons removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
