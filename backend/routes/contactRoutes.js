const express = require('express');
const { submitContactMessage, getContactMessages, deleteContactMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

const router = express.Router();

// Public route for submitting messages
router.post('/', submitContactMessage);

// Admin routes for viewing and deleting messages
router.get('/', protect, admin, getContactMessages);
router.delete('/:id', protect, admin, deleteContactMessage);

module.exports = router;
