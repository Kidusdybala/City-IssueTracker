const Issue = require('../models/Issue');
const User = require('../models/User');

class IssueService {
  /**
   * Get issues with filtering and pagination
   */
  async getIssues(query = {}, options = {}) {
    const {
      page = 1,
      limit = 10,
      sort = { createdAt: -1 },
      populate = []
    } = options;

    const skip = (page - 1) * limit;

    const issues = await Issue.find(query)
      .populate(populate)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await Issue.countDocuments(query);

    return {
      issues,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get single issue by ID
   */
  async getIssueById(id, populate = []) {
    return await Issue.findById(id).populate(populate);
  }

  /**
   * Create new issue
   */
  async createIssue(issueData, userId) {
    const issue = await Issue.create({
      ...issueData,
      reporterId: userId
    });

    // Award points to user
    await User.findByIdAndUpdate(userId, { $inc: { points: 10 } });

    return await Issue.findById(issue._id).populate('reporterId', 'name avatar');
  }

  /**
   * Update issue
   */
  async updateIssue(id, updateData, userId) {
    const issue = await Issue.findById(id);

    if (!issue) {
      throw new Error('Issue not found');
    }

    // Check ownership or admin role
    if (issue.reporterId.toString() !== userId.toString()) {
      const user = await User.findById(userId);
      if (!user || user.role !== 'admin') {
        throw new Error('Not authorized to update this issue');
      }
    }

    return await Issue.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate('reporterId', 'name avatar');
  }

  /**
   * Delete issue
   */
  async deleteIssue(id, userId) {
    const issue = await Issue.findById(id);

    if (!issue) {
      throw new Error('Issue not found');
    }

    // Check ownership or admin role
    if (issue.reporterId.toString() !== userId.toString()) {
      const user = await User.findById(userId);
      if (!user || user.role !== 'admin') {
        throw new Error('Not authorized to delete this issue');
      }
    }

    await Issue.findByIdAndDelete(id);
  }

  /**
   * Get issues statistics
   */
  async getIssuesStats() {
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

    return {
      stats: stats[0] || {
        totalIssues: 0,
        resolvedIssues: 0,
        pendingIssues: 0,
        inProgressIssues: 0
      },
      categoryStats
    };
  }

  /**
   * Toggle upvote for an issue
   */
  async toggleUpvote(issueId, userId) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw new Error('Issue not found');
    }

    const existingVote = issue.upvotes.find(vote =>
      vote.userId.toString() === userId.toString()
    );

    if (existingVote) {
      issue.upvotes = issue.upvotes.filter(vote =>
        vote.userId.toString() !== userId.toString()
      );
    } else {
      issue.upvotes.push({ userId });
    }

    return await issue.save();
  }

  /**
   * Add comment to an issue
   */
  async addComment(issueId, userId, content) {
    const issue = await Issue.findById(issueId);

    if (!issue) {
      throw new Error('Issue not found');
    }

    issue.comments.push({ userId, content });
    return await issue.save();
  }
}

module.exports = new IssueService();