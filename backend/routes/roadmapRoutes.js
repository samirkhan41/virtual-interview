const express = require('express');
const { getRoadmaps, createRoadmap } = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getRoadmaps)
  .post(protect, admin, createRoadmap);

module.exports = router;
