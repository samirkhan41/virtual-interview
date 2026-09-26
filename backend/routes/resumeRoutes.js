const express = require('express');
const { uploadResume, getResumes } = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, upload.single('resume'), uploadResume)
  .get(protect, getResumes);

module.exports = router;
