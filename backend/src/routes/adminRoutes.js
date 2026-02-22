const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
const { dashboard } = require("../controllers/adminController");

router.get("/dashboard", auth, role("admin"), dashboard);

module.exports = router;
