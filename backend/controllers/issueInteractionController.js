const issueService = require('../services/issueService');

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
const upvoteIssue = async (req, res) => {
  try {
    await issueService.toggleUpvote(req.params.id, req.user._id);

    res.json({
      success: true,
      message: 'Vote updated successfully'
    });
  } catch (error) {
    console.error('Upvote issue error:', error);

    if (error.message === 'Issue not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Add comment to issue
// @route   POST /api/issues/:id/comments
// @access  Private
const addComment = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Comment content is required'
      });
    }

    await issueService.addComment(req.params.id, req.user._id, content.trim());

    res.status(201).json({
      success: true,
      message: 'Comment added successfully'
    });
  } catch (error) {
    console.error('Add comment error:', error);

    if (error.message === 'Issue not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  upvoteIssue,
  addComment
};