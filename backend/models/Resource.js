const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'pdf', 'image', 'link'
  filePath: { type: String }, // For uploaded files
  link: { type: String }, // For external notes/resources
}, { timestamps: true });

module.exports = mongoose.model('Resource', resourceSchema);
