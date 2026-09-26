const express = require('express');
const { createResource, getResources, deleteResource } = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getResources)
  .post(protect, admin, upload.single('resource'), createResource);

router.route('/:id')
  .delete(protect, admin, deleteResource);

module.exports = router;
