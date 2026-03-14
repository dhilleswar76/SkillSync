const CodingSheetProgress = require("../models/CodingSheetProgress");

// Get user's progress for a specific coding sheet
exports.getSheetProgress = async (req, res) => {
  try {
    const { sheetId } = req.params;

    let progress = await CodingSheetProgress.findOne({
      student: req.user._id,
      sheetId: sheetId
    });

    if (!progress) {
      progress = {
        student: req.user._id,
        sheetId: sheetId,
        completedProblems: []
      };
    }

    res.json(progress);
  } catch (error) {
    console.error("Error fetching sheet progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle problem completion status
exports.toggleProblemComplete = async (req, res) => {
  try {
    const { sheetId, problemId } = req.body;

    if (!sheetId || problemId === undefined) {
      return res.status(400).json({ 
        message: "sheetId and problemId are required" 
      });
    }

    let progress = await CodingSheetProgress.findOne({
      student: req.user._id,
      sheetId: sheetId
    });

    if (!progress) {
      // Create new progress document with this problem marked as complete
      progress = await CodingSheetProgress.create({
        student: req.user._id,
        sheetId: sheetId,
        completedProblems: [{ problemId }]
      });
    } else {
      // Check if problem is already completed
      const problemIndex = progress.completedProblems.findIndex(
        p => p.problemId === problemId
      );

      if (problemIndex > -1) {
        // Problem is completed, remove it (unchecking)
        progress.completedProblems.splice(problemIndex, 1);
      } else {
        // Problem not completed, add it (checking)
        progress.completedProblems.push({ problemId });
      }

      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error("Error toggling problem completion:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all sheets progress for a user (for dashboard/stats)
exports.getAllSheetsProgress = async (req, res) => {
  try {
    const allProgress = await CodingSheetProgress.find({
      student: req.user._id
    });

    res.json(allProgress);
  } catch (error) {
    console.error("Error fetching all sheets progress:", error);
    res.status(500).json({ message: "Server error" });
  }
};
