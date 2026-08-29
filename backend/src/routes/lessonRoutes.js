const express = require("express");
const router = express.Router();
const {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.get("/:id", getLessonById);
router.post("/", protect, adminOnly, createLesson);
router.put("/:id", protect, adminOnly, updateLesson);
router.delete("/:id", protect, adminOnly, deleteLesson);

module.exports = router;
