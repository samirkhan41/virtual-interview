const Resource = require('../models/Resource');

const createResource = async (req, res) => {
  const { title, category, type, link } = req.body;
  try {
    const filePath = req.file ? req.file.path : undefined;

    const resource = await Resource.create({
      title,
      category,
      type,
      filePath,
      link
    });

    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getResources = async (req, res) => {
  try {
    const query = req.query.category ? { category: req.query.category } : {};
    const resources = await Resource.find(query).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    await resource.deleteOne();
    res.json({ message: 'Resource removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createResource, getResources, deleteResource };
