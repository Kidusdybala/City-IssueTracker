const issueService = require('../services/issueService');

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
  try {
    const { title, description, category, priority, location, images, tags } = req.body;

    const issue = await issueService.createIssue({
      title,
      description,
      category,
      priority: priority || 'medium',
      location,
      images: images || [],
      tags: tags || []
    }, req.user._id);

    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      data: { issue }
    });
  } catch (error) {
    console.error('Create issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
// @access  Private (owner or admin)
const updateIssue = async (req, res) => {
  try {
    const allowedFields = ['title', 'description', 'category', 'priority', 'tags'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const issue = await issueService.updateIssue(req.params.id, updateData, req.user._id);

    res.json({
      success: true,
      message: 'Issue updated successfully',
      data: { issue }
    });
  } catch (error) {
    console.error('Update issue error:', error);

    if (error.message === 'Issue not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes('Not authorized')) {
      return res.status(403).json({
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

// @desc    Delete issue
// @route   DELETE /api/issues/:id
// @access  Private (owner or admin)
const deleteIssue = async (req, res) => {
  try {
    await issueService.deleteIssue(req.params.id, req.user._id);

    res.json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Delete issue error:', error);

    if (error.message === 'Issue not found') {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
    if (error.message.includes('Not authorized')) {
      return res.status(403).json({
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
  createIssue,
  updateIssue,
  deleteIssue
};