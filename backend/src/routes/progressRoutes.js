const express = require("express");
const router = express.Router();
const {
  getAllUserProgress,
  getCourseProgress,
  updateProgress,
} = require("../controllers/progressController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getAllUserProgress);
router.get("/:courseId", protect, getCourseProgress);
router.post("/:courseId", protect, updateProgress);

module.exports = router;
