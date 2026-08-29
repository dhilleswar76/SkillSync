const express = require("express");
const router = express.Router();
const {
  getAllSheets,
  getSheetById,
  getSheetProgress,
  updateSheetProgress,
} = require("../controllers/codingSheetController");
const { protect } = require("../middlewares/authMiddleware");

// Public routes to view sheets
router.get("/", getAllSheets);
router.get("/:sheetId", getSheetById);

// Protected routes to read/write user progress on sheets
router.get("/:sheetId/progress", protect, getSheetProgress);
router.post("/:sheetId/progress", protect, updateSheetProgress);

module.exports = router;
