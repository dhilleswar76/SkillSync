const mongoose = require("mongoose");

const codingSheetProgressSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  sheetId: { 
    type: String, 
    required: true 
  },
  completedProblems: [{
    problemId: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

// Compound index to ensure one progress document per user per sheet
codingSheetProgressSchema.index({ student: 1, sheetId: 1 }, { unique: true });

module.exports = mongoose.model("CodingSheetProgress", codingSheetProgressSchema);
