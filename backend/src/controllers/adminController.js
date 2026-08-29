const User = require("../models/User");
const Course = require("../models/Course");
const Certificate = require("../models/Certificate");
const Progress = require("../models/Progress");

// @desc Get admin dashboard stats
// @route GET /api/admin/stats
const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalCourses = await Course.countDocuments();
    const totalCertificates = await Certificate.countDocuments();

    const recentUsers = await User.find().sort("-createdAt").limit(5).select("-password");
    const recentCourses = await Course.find().sort("-createdAt").limit(5);

    res.json({
      totalUsers,
      totalStudents,
      totalCourses,
      totalCertificates,
      recentUsers,
      recentCourses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all users for admin
// @route GET /api/admin/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort("-createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user role (Admin)
// @route PUT /api/admin/users/:id/role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminStats,
  getAllUsers,
  updateUserRole,
};
