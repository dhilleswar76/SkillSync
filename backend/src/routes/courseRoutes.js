const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const {
  createCourse,
  getCourses,
  enrollCourse
} = require("../controllers/courseController");

router.get("/", getCourses);
router.post("/", auth, role("admin"), createCourse);
router.post("/enroll/:courseId", auth, enrollCourse);

module.exports = router;
