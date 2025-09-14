const express = require('express');
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
const {
  createIssueValidation,
  updateIssueValidation,
  addCommentValidation
} = require('../validators/issueValidators');

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