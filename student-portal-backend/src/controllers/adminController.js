const User = require("../models/User");
const Course = require("../models/Course");
const Progress = require("../models/Progress");

exports.dashboard = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalCourses = await Course.countDocuments();
  const activeStudents = await Progress.countDocuments({
    completedLessons: { $exists: true, $ne: [] }
  });

  res.json({
    totalUsers,
    totalCourses,
    activeStudents
  });
};
