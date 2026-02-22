const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { createLesson } = require("../controllers/lessonController");

router.post("/", auth, role("admin"), createLesson);

module.exports = router;
