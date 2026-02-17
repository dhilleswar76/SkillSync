const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const { markComplete } = require("../controllers/progressController");

router.post("/complete", auth, markComplete);

module.exports = router;
