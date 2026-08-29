const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllUsers,
  updateUserRole,
} = require("../controllers/adminController");
const { protect } = require("../middlewares/authMiddleware");
const { adminOnly } = require("../middlewares/adminMiddleware");

router.use(protect, adminOnly);

router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.put("/users/:id/role", updateUserRole);

module.exports = router;
