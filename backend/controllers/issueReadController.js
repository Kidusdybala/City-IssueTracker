const issueService = require('../services/issueService');

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

    const result = await issueService.getIssues(query, {
      page,
      limit,
      sort: sortOption,
      populate: ['reporterId', 'assignedTo']
    });

    res.json({
      success: true,
      data: result
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
    const issue = await issueService.getIssueById(req.params.id, [
      { path: 'reporterId', select: 'name avatar email' },
      { path: 'assignedTo', select: 'name email' },
      { path: 'comments.userId', select: 'name avatar' }
    ]);

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
    const result = await issueService.getIssuesStats();

    res.json({
      success: true,
      data: result
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
  getUserIssues,
  getIssuesStats
};