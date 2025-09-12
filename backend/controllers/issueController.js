const Issue = require('../models/Issue');
const User = require('../models/User');

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public (for viewing), Private (for full details)
const getIssues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isPublic: true };

    // Filter by category
    if (req.query.category && req.query.category !== 'all') {
      query.category = req.query.category;
    }

    // Filter by status
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }

    // Filter by priority
    if (req.query.priority && req.query.priority !== 'all') {
      query.priority = req.query.priority;
    }

    // Search by title, description, or address
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { 'location.address': searchRegex }
      ];
    }

    // Sort options
    let sortOption = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'oldest') {
      sortOption = { createdAt: 1 };
    } else if (req.query.sort === 'priority') {
      sortOption = { priority: -1, createdAt: -1 };
    } else if (req.query.sort === 'upvotes') {
      sortOption = { upvotesCount: -1, createdAt: -1 };
    }

    const issues = await Issue.find(query)
      .populate('reporterId', 'name avatar')
      .populate('assignedTo', 'name')
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Issue.countDocuments(query);

    res.json({
      success: true,
      data: {
        issues,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Public
const getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reporterId', 'name avatar email')
      .populate('assignedTo', 'name email')
      .populate('comments.userId', 'name avatar');

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Increment view count
    await Issue.findByIdAndUpdate(req.params.id, { $inc: { viewCount: 1 } });

    res.json({
      success: true,
      data: { issue }
    });
  } catch (error) {
    console.error('Get issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new issue
// @route   POST /api/issues
// @access  Private
const createIssue = async (req, res) => {
  try {
    const { title, description, category, priority, location, images, tags } = req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      priority: priority || 'medium',
      location,
      images: images || [],
      tags: tags || [],
      reporterId: req.user._id
    });

    // Award points to user
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

    const populatedIssue = await Issue.findById(issue._id)
      .populate('reporterId', 'name avatar');

    res.status(201).json({
      success: true,
      message: 'Issue reported successfully',
      data: { issue: populatedIssue }
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
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check ownership or admin role
    if (issue.reporterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this issue'
      });
    }

    const allowedFields = ['title', 'description', 'category', 'priority', 'tags'];
    const updateData = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    issue = await Issue.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    }).populate('reporterId', 'name avatar');

    res.json({
      success: true,
      message: 'Issue updated successfully',
      data: { issue }
    });
  } catch (error) {
    console.error('Update issue error:', error);
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
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check ownership or admin role
    if (issue.reporterId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this issue'
      });
    }

    await Issue.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    console.error('Delete issue error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
// @access  Private
const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    await issue.toggleUpvote(req.user._id);

    res.json({
      success: true,
      message: 'Vote updated successfully'
    });
  } catch (error) {
    console.error('Upvote issue error:', error);
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

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    await issue.addComment(req.user._id, content.trim());

    res.status(201).json({
      success: true,
      message: 'Comment added successfully'
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get user's issues
// @route   GET /api/issues/user/:userId
// @access  Public
const getUserIssues = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const issues = await Issue.find({ reporterId: req.params.userId })
      .populate('reporterId', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Issue.countDocuments({ reporterId: req.params.userId });

    res.json({
      success: true,
      data: {
        issues,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get user issues error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get issues statistics
// @route   GET /api/issues/stats
// @access  Public
const getIssuesStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: null,
          totalIssues: { $sum: 1 },
          resolvedIssues: {
            $sum: { $cond: [{ $eq: ['$status', 'resolved'] }, 1, 0] }
          },
          pendingIssues: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inProgressIssues: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          }
        }
      }
    ]);

    const categoryStats = await Issue.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        stats: stats[0] || {
          totalIssues: 0,
          resolvedIssues: 0,
          pendingIssues: 0,
          inProgressIssues: 0
        },
        categoryStats
      }
    });
  } catch (error) {
    console.error('Get issues stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  upvoteIssue,
  addComment,
  getUserIssues,
  getIssuesStats
};