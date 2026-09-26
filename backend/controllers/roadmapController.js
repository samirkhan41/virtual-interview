const Roadmap = require('../models/Roadmap');

const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({});
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.create(req.body);
    res.status(201).json(roadmap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRoadmaps, createRoadmap };
