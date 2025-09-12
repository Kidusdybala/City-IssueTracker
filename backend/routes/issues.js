const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  addComment,
  getUserIssues,
  getIssuesStats
} = require('../controllers/issueController');

const { protect, optionalAuth } = require('../middleware/auth');

// Validation rules
const createIssueValidation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['pothole', 'streetlight', 'garbage', 'traffic', 'water', 'sewage', 'other'])
    .withMessage('Please select a valid category'),
  body('location.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),
  body('location.coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Valid latitude is required'),
  body('location.coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Valid longitude is required')
];

const updateIssueValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .optional()
    .isIn(['pothole', 'streetlight', 'garbage', 'traffic', 'water', 'sewage', 'other'])
    .withMessage('Please select a valid category')
];

const addCommentValidation = [
  body('content')
    .trim()
    .isLength({ min: 1, max: 300 })
    .withMessage('Comment must be between 1 and 300 characters')
];

// Public routes
router.get('/', optionalAuth, getIssues);
router.get('/stats', getIssuesStats);
router.get('/:id', optionalAuth, getIssue);
router.get('/user/:userId', getUserIssues);

// Protected routes
router.post('/', protect, createIssueValidation, createIssue);
router.put('/:id', protect, updateIssueValidation, updateIssue);
router.delete('/:id', protect, deleteIssue);
router.post('/:id/upvote', protect, upvoteIssue);
router.post('/:id/comments', protect, addCommentValidation, addComment);

module.exports = router;