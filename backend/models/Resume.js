const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  originalName: { type: String, required: true },
  filePath: { type: String, required: true },
  atsScore: { type: Number, default: 0 },
  readabilityScore: { type: Number, default: 0 },
  impactScore: { type: Number, default: 0 },
  skills: [{ type: String }],
  missingSkills: [{ type: String }],
  suggestions: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
