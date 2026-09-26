const Resume = require('../models/Resume');

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Mock analysis data since we don't have a real LLM connected
    const atsScore = Math.floor(Math.random() * (95 - 60 + 1) + 60);
    const readabilityScore = Math.floor(Math.random() * (98 - 75 + 1) + 75);
    const impactScore = Math.floor(Math.random() * (90 - 50 + 1) + 50);
    const mockSkills = ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'];
    const missingSkills = ['Docker', 'AWS', 'GraphQL', 'TypeScript'];
    const mockSuggestions = ['Add more quantifiable achievements', 'Use stronger action verbs', 'Include a summary section'];

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      filePath: req.file.path,
      atsScore,
      readabilityScore,
      impactScore,
      skills: mockSkills,
      missingSkills,
      suggestions: mockSuggestions
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadResume, getResumes };
