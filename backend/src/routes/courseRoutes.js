const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourseById,
  getEnrolledCourses,
  enrollCourse,
  unenrollCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.get("/enrolled", protect, getEnrolledCourses);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.post("/:id/enroll", protect, enrollCourse);
router.post("/:id/unenroll", protect, unenrollCourse);
router.post("/", protect, adminOnly, createCourse);
router.put("/:id", protect, adminOnly, updateCourse);
router.delete("/:id", protect, adminOnly, deleteCourse);

module.exports = router;
