const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  role: { type: String, required: true },
  description: { type: String },
  skills: [{ type: String }],
  technologies: [{ type: String }],
  projects: [{ type: String }],
  resources: [{
    title: { type: String },
    url: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
