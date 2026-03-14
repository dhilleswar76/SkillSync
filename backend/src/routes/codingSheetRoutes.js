const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const {
  getSheetProgress,
  toggleProblemComplete,
  getAllSheetsProgress
} = require("../controllers/codingSheetController");

// Get progress for a specific sheet
router.get("/progress/:sheetId", auth, getSheetProgress);

// Toggle problem completion
router.post("/progress/toggle", auth, toggleProblemComplete);

// Get all sheets progress for current user
router.get("/progress/all", auth, getAllSheetsProgress);

module.exports = router;
