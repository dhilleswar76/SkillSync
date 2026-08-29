const express = require("express");
const router = express.Router();
const { getLessonComments, addComment } = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/lesson/:lessonId", getLessonComments);
router.post("/", protect, addComment);

module.exports = router;
