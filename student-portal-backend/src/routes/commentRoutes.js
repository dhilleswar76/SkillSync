const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { addComment } = require("../controllers/commentController");

router.post("/:lessonId", auth, addComment);

module.exports = router;
